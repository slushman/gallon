import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Wrapper from '../../components/Wrapper';

import * as routes from '../../constants/routes';
import { serviceList } from '../../constants/services';
import * as utils from '../../utils';

const SelectServices = ({ navigation: { navigate }, route }) => {
  const selectedServices = R.pathOr([], ['params', 'servicesList'], route);
  const [services, setServices] = React.useState(selectedServices);

  const saveSelectedServices = React.useCallback(
    () => {
      navigate(routes.NEW_SERVICE, { services });
    },
    [navigate, services],
  );

  const toggleService = React.useCallback(
    (service) => () => {
      const updated = utils.updateArray(services, service);
      setServices(updated);
    },
    [services, setServices],
  );

  return (
    <Wrapper centerContent>
      <ScrollView>
        {serviceList.map((service, index) => (
          <ListItem
            isSelected={R.includes(service, services)}
            key={index}
            leftContent={service}
            onPress={toggleService(service)}
          />
        ))}
      </ScrollView>
      <Button disabled={services.length < 1} label="Save" onPress={saveSelectedServices} />
    </Wrapper>
  );
};

SelectServices.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default React.memo(SelectServices);

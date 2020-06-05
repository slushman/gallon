import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Wrapper from '../../components/Wrapper';

import * as colors from '../../constants/colors';
import { serviceList } from '../../constants/services';
import { updateArray } from '../../utils';

const SelectServices = ({ route }) => {
  const { updateValues } = R.prop('params', route);
  const [services, setServices] = React.useState([]);

  const saveSelectedServices = React.useCallback(
    () => {
      updateValues(services);
      console.log('closeSelectServices');
    },
    [services, updateValues],
  );

  const toggleService = React.useCallback(
    (service) => () => {
      const updated = updateArray(services, service);
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

export default React.memo(SelectServices);

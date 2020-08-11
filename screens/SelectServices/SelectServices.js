import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { useNavigationState } from '@react-navigation/native';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Wrapper from '../../components/Wrapper';
import * as routes from '../../constants/routes';
import { serviceList } from '../../constants/services';
import * as utils from '../../utils';

const getServiceKey = service => R.indexOf(service, serviceList).toString();

const SelectServices = ({ navigation: { navigate }, route }) => {
  const entry = R.pathOr({}, ['params', 'entry'], route);
  const services = R.propOr([], 'services', entry);
  const [selectedServices, setSelectedServices] = React.useState(services);
  const navState = useNavigationState(state => state);
  const previousScreen = R.path(['routes', 0, 'name'], navState);

  const saveSelectedServices = React.useCallback(
    () => {
      const newEntry = R.isEmpty(entry) ? {} : R.assoc('services', selectedServices, entry);
      const params = R.isEmpty(entry)
        ? { services: selectedServices }
        : { entry: newEntry };
      console.log('SelectServices', { params });
      navigate(routes.SERVICE_STACK, {
        screen: previousScreen,
        params,
      });
    },
    [entry, navigate, previousScreen, selectedServices],
  );

  const toggleService = React.useCallback(
    (service) => () => {
      const updated = utils.updateArray(selectedServices, service);
      setSelectedServices(updated);
    },
    [selectedServices, setSelectedServices],
  );

  const renderServiceItem = React.useCallback(
    ({ item }) => (
      <ListItem
        isSelected={R.includes(item, selectedServices)}
        leftContent={item}
        onPress={toggleService(item)}
        shortItem
      />
    ),
    [selectedServices, toggleService],
  );

  const saveButton = React.useMemo(
    () => (<Button disabled={selectedServices.length < 1} label="Save Selections" onPress={saveSelectedServices} />),
    [saveSelectedServices, selectedServices],
  );

  return (
    <Wrapper>
      <FlatList
        data={serviceList}
        keyExtractor={getServiceKey}
        ListFooterComponent={saveButton}
        renderItem={renderServiceItem}
      />
    </Wrapper>
  );
};

SelectServices.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default React.memo(SelectServices);

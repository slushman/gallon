import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Button from '../../components/Button';
import ListItem from '../../components/ListItem';
import Wrapper from '../../components/Wrapper';
import { Route, Service } from '../../constants/enums';
import * as utils from '../../utils';

const serviceList = [
  Service.AIR_FILTER,
  Service.FRONT_DRIVER_TIRE,
  Service.FRONT_PASSENGER_TIRE,
  Service.OIL_CHANGE,
  Service.RADIOATOR_FLUSH,
  Service.REAR_DRIVER_TIRE,
  Service.REAR_PASSENGER_TIRE,
  Service.TIRE_ROTATION,
  Service.TRANSMISSION_FLUID,
  Service.OTHER,
];

const getServiceKey = (service: string) => R.indexOf(service, serviceList).toString();

const SelectServices = ({ navigation: { navigate }, route }) => {
  const entry = R.pathOr({}, ['params', 'entry'], route);
  const entryServices = R.propOr([], 'services', entry);
  const services = R.pathOr(entryServices, ['params', 'services'], route);
  const [selectedServices, setSelectedServices] = React.useState(services);

  const saveSelectedServices = React.useCallback(
    () => {
      const newEntry = R.isEmpty(entry) ? {} : R.assoc('services', selectedServices, entry);
      const params = R.isEmpty(entry)
        ? { selectedServices }
        : { entry: newEntry };
      navigate(Route.SERVICE_FORM, params);
    },
    [entry, navigate, selectedServices],
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

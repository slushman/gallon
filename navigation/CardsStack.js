import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EntryList from '../screens/EntryList';
import FillupDetails from '../screens/FillupDetails';
import ServiceDetails from '../screens/ServiceDetails';
import Settings from '../screens/Settings';
import VehicleForm from '../screens/VehicleForm';
import VehicleDetails from '../screens/VehicleDetails';

import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const CardsStackScreen = () => (
  <Stack.Navigator initialRouteName={routes.ENTRY_LIST}>
    <Stack.Screen
      component={EntryList}
      name={routes.ENTRY_LIST}
    />
    <Stack.Screen
      component={FillupDetails}
      name={routes.FILLUP_DETAILS}
    />
    <Stack.Screen
      component={ServiceDetails}
      name={routes.SERVICE_DETAILS}
    />
    <Stack.Screen
      component={Settings}
      name={routes.SETTINGS}
    />
    <Stack.Screen
      component={VehicleForm}
      name={routes.VEHICLE_FORM}
    />
    <Stack.Screen
      component={VehicleDetails}
      name={routes.VEHICLE_DETAILS}
    />
  </Stack.Navigator>
);

export default CardsStackScreen;

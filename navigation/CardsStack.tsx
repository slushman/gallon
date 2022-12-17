import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EntryList from '../screens/EntryList';
import FillupDetails from '../screens/FillupDetails';
import ServiceDetails from '../screens/ServiceDetails';
import Settings from '../screens/Settings';
import VehicleForm from '../screens/VehicleForm';
import VehicleDetails from '../screens/VehicleDetails';
import { Route } from '../constants/enums';

const Stack = createStackNavigator();

const CardsStackScreen = () => (
  <Stack.Navigator initialRouteName={Route.ENTRY_LIST}>
    <Stack.Screen
      component={EntryList}
      name={Route.ENTRY_LIST}
    />
    <Stack.Screen
      component={FillupDetails}
      name={Route.FILLUP_DETAILS}
    />
    <Stack.Screen
      component={ServiceDetails}
      name={Route.SERVICE_DETAILS}
    />
    <Stack.Screen
      component={Settings}
      name={Route.SETTINGS}
    />
    <Stack.Screen
      component={VehicleForm}
      name={Route.VEHICLE_FORM}
    />
    <Stack.Screen
      component={VehicleDetails}
      name={Route.VEHICLE_DETAILS}
    />
  </Stack.Navigator>
);

export default CardsStackScreen;

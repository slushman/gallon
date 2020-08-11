import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VehicleForm from '../screens/VehicleForm';
import Settings from '../screens/Settings';
import VehicleDetails from '../screens/VehicleDetails';
import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const SettingsStackScreen = () => (
  <Stack.Navigator initialRouteName={routes.SETTINGS}>
    <Stack.Screen
      component={Settings}
      name={routes.SETTINGS}
    />
    <Stack.Screen
      component={VehicleDetails}
      name={routes.VEHICLE_DETAILS}
    />
    <Stack.Screen
      component={VehicleForm}
      name={routes.NEW_VEHICLE}
    />
    <Stack.Screen
      component={VehicleForm}
      name={routes.EDIT_VEHICLE}
    />
  </Stack.Navigator>
);

export default SettingsStackScreen;

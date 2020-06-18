import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainStackScreen from './MainStack';
import SettingsStackScreen from './SettingsStack';
import NewFillup from '../screens/NewFillup';
import NewService from '../screens/NewService';
import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName={routes.HOME} mode="modal">
    <Stack.Screen
      component={MainStackScreen}
      name={routes.ENTRY_LIST}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={SettingsStackScreen}
      name={routes.SETTINGS}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={NewFillup}
      name={routes.NEW_FILLUP}
    />
    <Stack.Screen
      component={NewService}
      name={routes.NEW_SERVICE}
    />
  </Stack.Navigator>
);

export default RootStack;

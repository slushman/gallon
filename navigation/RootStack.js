import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as R from 'ramda';

import MainStackScreen from './MainStack';
import SettingsStackScreen from './SettingsStack';
import NewServiceStackScreen from './NewServiceStack';
import NewFillup from '../screens/NewFillup';
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
      component={NewServiceStackScreen}
      name={routes.NEW_SERVICE}
      options={({ route }) => ({
        headerShown: !R.pathEq(['state', 'index'], 1, route),
      })}
    />
  </Stack.Navigator>
);

export default RootStack;

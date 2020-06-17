import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainStackScreen from '../MainStack';
import NewFillup from '../../screens/NewFillup';
import NewService from '../../screens/NewService';
import Settings from '../../screens/Settings';
import * as routes from '../../constants/routes';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName={routes.HOME} mode="modal">
    <Stack.Screen
      component={MainStackScreen}
      name={routes.ENTRY_LIST}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={Settings}
      name={routes.SETTINGS}
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

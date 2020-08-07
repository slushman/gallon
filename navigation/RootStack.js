import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as R from 'ramda';

import MainStackScreen from './MainStack';
import SettingsStackScreen from './SettingsStack';
import NewServiceStackScreen from './NewServiceStack';
import FillupForm from '../screens/FillupForm';
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
      component={FillupForm}
      name={routes.NEW_FILLUP}
    />
    <Stack.Screen
      component={FillupForm}
      name={routes.EDIT_FILLUP}
    />
    <Stack.Screen
      component={NewServiceStackScreen}
      name={routes.SERVICE_STACK}
      options={({ route }) => ({
        headerShown: (!R.propEq('name', routes.SERVICE_STACK, route) && !R.pathEq(['params', 'screen'], routes.SELECT_SERVICES, route))
          || (!R.propEq('name', routes.SERVICE_STACK, route) && !R.pathEq(['params', 'screen'], routes.NEW_SERVICE, route))
          || (!R.propEq('name', routes.SERVICE_STACK, route) && !R.pathEq(['params', 'screen'], routes.EDIT_SERVICE, route)),
      })}
    />
  </Stack.Navigator>
);

export default RootStack;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as R from 'ramda';

import ServiceForm from '../screens/ServiceForm';
import SelectServices from '../screens/SelectServices';
import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const NewServiceStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={ServiceForm}
      name={routes.NEW_SERVICE}
    />
    <Stack.Screen
      component={ServiceForm}
      name={routes.EDIT_SERVICE}
      options={({ route }) => ({
        headerShown: R.prop('name', route) === routes.EDIT_SERVICE
          || R.pathEq(['params', 'screen'], routes.EDIT_SERVICE, route),
      })}
    />
    <Stack.Screen
      component={SelectServices}
      name={routes.SELECT_SERVICES}
      options={({ route }) => ({
        headerShown: R.prop('name', route) === routes.SELECT_SERVICES,
      })}
    />
  </Stack.Navigator>
);

export default NewServiceStackScreen;

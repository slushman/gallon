import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as R from 'ramda';

import NewService from '../screens/NewService';
import SelectServices from '../screens/SelectServices';
import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const NewServiceStackScreen = () => (
  <Stack.Navigator initialRouteName={routes.NEW_SERVICE}>
    <Stack.Screen
      component={NewService}
      name={routes.NEW_SERVICE}
      options={{ headerShown: false }}
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

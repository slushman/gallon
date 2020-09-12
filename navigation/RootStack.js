import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CardsStackScreen from './CardsStack';
import FillupForm from '../screens/FillupForm';
import ServiceStackScreen from './ServiceStack';

import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName={routes.ENTRY_LIST} mode="modal">
    <Stack.Screen
      component={CardsStackScreen}
      name="Entries"
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={FillupForm}
      name={routes.FILLUP_FORM}
    />
    <Stack.Screen
      component={ServiceStackScreen}
      name="Service"
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RootStack;

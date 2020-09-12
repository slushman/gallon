import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ServiceForm from '../screens/ServiceForm';
import SelectServices from '../screens/SelectServices';

import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const ServiceStackScreen = () => (
  <Stack.Navigator initialRouteName={routes.SERVICE_FORM}>
    <Stack.Screen
      component={ServiceForm}
      name={routes.SERVICE_FORM}
    />
    <Stack.Screen
      component={SelectServices}
      name={routes.SELECT_SERVICES}
    />
  </Stack.Navigator>
);

export default ServiceStackScreen;

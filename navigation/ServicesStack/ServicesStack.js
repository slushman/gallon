import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewService from '../../screens/NewService';
import SelectServices from '../../screens/SelectServices';
import * as routes from '../../constants/routes';

const Stack = createStackNavigator();

const ServicesStack = () => (
  <Stack.Navigator initialRouteName={routes.NEW_SERVICE}>
    <Stack.Screen
      component={NewService}
      name={routes.NEW_SERVICE}
      options={{ title: 'New Service' }}
    />
    <Stack.Screen
      component={SelectServices}
      name={routes.SELECT_SERVICES}
      options={{ title: 'Select Services' }}
    />
  </Stack.Navigator>
);

export default ServicesStack;

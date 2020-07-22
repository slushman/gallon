import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EntryList from '../screens/EntryList';
import FillupDetails from '../screens/FillupDetails';
import SelectServices from '../screens/SelectServices';
import ServiceDetails from '../screens/ServiceDetails';
import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const MainStackScreen = () => (
  <Stack.Navigator initialRouteName={routes.ENTRY_LIST}>
    <Stack.Screen
      component={EntryList}
      name={routes.ENTRY_LIST}
    />
    <Stack.Screen
      component={ServiceDetails}
      name={routes.SERVICE_DETAILS}
    />
    <Stack.Screen
      component={FillupDetails}
      name={routes.FILLUP_DETAILS}
    />
    <Stack.Screen
      component={SelectServices}
      name={routes.SELECT_SERVICES}
    />
  </Stack.Navigator>
);

export default MainStackScreen;

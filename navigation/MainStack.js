import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as R from 'ramda';

import Entry from '../screens/Entry';
import EntryList from '../screens/EntryList';
import SelectServices from '../screens/SelectServices';
import * as routes from '../constants/routes';

const Stack = createStackNavigator();

const MainStackScreen = () => (
  <Stack.Navigator initialRouteName={routes.ENTRY_LIST}>
    <Stack.Screen
      component={EntryList}
      name={routes.ENTRY_LIST}
    />
    <Stack.Screen
      component={Entry}
      name={routes.ENTRY}
      options={({ route }) => ({ title: R.path(['params', 'name'], route) })}
    />
    <Stack.Screen
      component={SelectServices}
      name={routes.SELECT_SERVICES}
    />
  </Stack.Navigator>
);

export default MainStackScreen;

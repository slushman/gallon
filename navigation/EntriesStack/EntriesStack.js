import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as R from 'ramda';

import EntryList from '../../screens/EntryList';
import Entry from '../../screens/Entry';
import * as routes from '../../constants/routes';

const Stack = createStackNavigator();

const EntriesStack = () => (
  <Stack.Navigator initialRouteName={routes.ENTRY_LIST}>
    <Stack.Screen
      component={EntryList}
      name={routes.ENTRY_LIST}
      options={{ title: 'Entries' }}
    />
    <Stack.Screen
      component={Entry}
      name={routes.ENTRY}
      options={({ route }) => ({ title: R.path(['params', 'name'], route) })}
    />
  </Stack.Navigator>
);

export default EntriesStack;

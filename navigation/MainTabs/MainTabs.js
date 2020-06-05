import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import NewFillup from '../../screens/NewFillup';

import EntriesStack from '../EntriesStack';
import ServicesStack from '../ServicesStack';
import Settings from '../../screens/Settings';
import * as routes from '../../constants/routes';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      component={EntriesStack}
      name={routes.ENTRY_LIST}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MCIcon color={color} name="format-list-bulleted" size={size} />
        ),
        tabBarLabel: 'Entries',
      }}
    />
    <Tab.Screen
      component={NewFillup}
      name={routes.NEW_FILLUP}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MCIcon color={color} name="gas-station" size={size} />
        ),
        tabBarLabel: 'New Fillup',
      }}
    />
    <Tab.Screen
      component={ServicesStack}
      name={routes.NEW_SERVICE}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MCIcon color={color} name="oil" size={size} />
        ),
        tabBarLabel: 'New Service',
      }}
    />
    <Tab.Screen
      component={Settings}
      name={routes.SETTINGS}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MCIcon color={color} name="settings" size={size} />
        ),
        tabBarLabel: 'Settings',
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;

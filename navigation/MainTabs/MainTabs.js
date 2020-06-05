import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import NewFillup from '../../screens/NewFillup';

import EntriesStack from '../EntriesStack';
import ServicesStack from '../ServicesStack';
import Settings from '../../screens/Settings';
import * as routes from '../../constants/routes';
import * as utils from '../../utils';

Icon.loadFont();

const Tab = createBottomTabNavigator();
const prefix = utils.getPrefix();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      component={EntriesStack}
      name={routes.ENTRY_LIST}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} name={`${prefix}list`} size={size} />
        ),
        tabBarLabel: 'Entries',
      }}
    />
    <Tab.Screen
      component={NewFillup}
      name={routes.NEW_FILLUP}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} name={`${prefix}add`} size={size} />
        ),
        tabBarLabel: 'New Fillup',
      }}
    />
    <Tab.Screen
      component={ServicesStack}
      name={routes.NEW_SERVICE}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} name={`${prefix}build`} size={size} />
        ),
        tabBarLabel: 'New Service',
      }}
    />
    <Tab.Screen
      component={Settings}
      name={routes.SETTINGS}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon color={color} name={`${prefix}settings`} size={size} />
        ),
        tabBarLabel: 'Settings',
      }}
    />
  </Tab.Navigator>
);

export default MainTabs;

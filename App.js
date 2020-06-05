import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Micon from 'react-native-vector-icons/MaterialIcons';

import MainTabs from './navigation/MainTabs';

Icon.loadFont();
Micon.loadFont();

const App = () => (
  <NavigationContainer>
    <MainTabs />
  </NavigationContainer>
);

export default App;

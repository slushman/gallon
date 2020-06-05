import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import MainTabs from './navigation/MainTabs';

MCIcon.loadFont();

const App = () => (
  <NavigationContainer>
    <MainTabs />
  </NavigationContainer>
);

export default App;

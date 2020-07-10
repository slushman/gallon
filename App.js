import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import RootStack from './navigation/RootStack';

Ionicon.loadFont();
MCIcon.loadFont();

const App = () => {
  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootStack />
        </NavigationContainer>
      </AppearanceProvider>
    </Provider>
  );
};

  export default App;

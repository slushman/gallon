import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import RootStack from './navigation/RootStack';

MCIcon.loadFont();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  </Provider>
);

export default App;

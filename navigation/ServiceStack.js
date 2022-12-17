import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceForm from '../screens/ServiceForm';
import SelectServices from '../screens/SelectServices';
import { Route } from '../constants/enums';
const Stack = createStackNavigator();
const ServiceStackScreen = () => (<Stack.Navigator initialRouteName={Route.SERVICE_FORM}>
    <Stack.Screen component={ServiceForm} name={Route.SERVICE_FORM}/>
    <Stack.Screen component={SelectServices} name={Route.SELECT_SERVICES}/>
  </Stack.Navigator>);
export default ServiceStackScreen;
//# sourceMappingURL=ServiceStack.js.map
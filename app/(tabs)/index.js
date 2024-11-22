import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home'; 
import LoginScreen from './Login';
import ForgetPassword from './ForgetPassword';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import Cart from './Cart';
import FoodDetail from './FoodDetail';

const Stack = createNativeStackNavigator();

function index() {
  return (
    //<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='Cart' component={Cart} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      </Stack.Navigator>
    //</NavigationContainer>
  );
}

export default index;

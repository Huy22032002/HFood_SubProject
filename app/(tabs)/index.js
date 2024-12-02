import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import LoginScreen from './Login';
import ForgetPassword from './ForgetPassword';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import Cart from './Cart';
import FoodDetail from './FoodDetail';
import AddCategory from './AddCategory';
import AddFood from './AddFood';
import Order from './Order'
import AppProvider from './AppProvider';
import OrderDetail from './OrderDetail'
const Stack = createNativeStackNavigator();

function Index() {
  return (
    //<NavigationContainer>
    <AppProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name='AddFood' component={AddFood}/>
        <Stack.Screen name='Order' component={Order} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    </AppProvider>
    //</NavigationContainer>
  );
}

export default Index;

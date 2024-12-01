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
import { CartProvider } from './CartContext';
const Stack = createNativeStackNavigator();

function Index() {
  return (
    //<NavigationContainer>
    <CartProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name='AddFood' component={AddFood}/>
      </Stack.Navigator>
    </CartProvider>
    //</NavigationContainer>
  );
}

export default Index;

import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '@Screens/Home';
import IntroScreen from '@Screens/Auth/Intro';
import LoginScreen from '@Screens/Auth/Login';
import RegisterScreen from '@Screens/Auth/Register';


const AuthStack = createStackNavigator({
  Intro: { screen: IntroScreen },
  Home: { screen: HomeScreen },
  // Login: { screen: LoginScreen },
  // Register: { screen: RegisterScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});


export default AuthStack;

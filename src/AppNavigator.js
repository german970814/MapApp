import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '@Screens/Home'
import IntroScreen from '@Screens/Auth'


const AuthStack = createStackNavigator({
  Intro: { screen: IntroScreen },
  Home: { screen: HomeScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'Intro',
});


export default AuthStack;

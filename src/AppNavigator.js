import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '@Screens/Home'
import IntroScreen from '@Screens/Auth'
import SessionService from '@Screens/Auth/SessionService'

const AuthStack = createStackNavigator({
  Intro: { screen: IntroScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'Intro',
});

const AppStack = createStackNavigator({
  Home: { screen: HomeScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
});

const Main = createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
  Loading: SessionService,
}, {
  initialRouteName: 'Loading'
});

export default Main;

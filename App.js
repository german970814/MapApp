/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
// import Loader from '@Components/Loader';
// import Loading from '@Components/Loading';
import { Root as NBRoot } from 'native-base';
import AppNavigator from './src/AppNavigator';
import { store, persistor } from './src/store';
import { Provider, connect } from 'react-redux';
import LoaderComponent from '@Components/Loader';
import LoaderScreen from '@Screens/LoaderScreen';
import { PersistGate } from 'redux-persist/integration/react';
import { createReduxContainer } from 'react-navigation-redux-helpers';

const AppWithNavigator = createReduxContainer(AppNavigator);
const AppWithNavigationState = connect(
  (state) => ({ state: state.navigation })
)(AppWithNavigator);

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoaderScreen />} persistor={persistor}>
        <NBRoot>
          <AppWithNavigationState />
          <LoaderComponent />
        </NBRoot>
      </PersistGate>
    </Provider>
  );
};


export default Root;

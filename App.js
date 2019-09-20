import React from 'react';
import { YellowBox } from 'react-native';
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

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

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

import reducers from '@Reducers';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const persistConfig = {
  storage,
  key: 'root',
  blacklist: ['tmp', 'navigation']
}

export const persistedReducer = persistReducer(persistConfig, reducers);
export const middleware = createReactNavigationReduxMiddleware(state => state.navigation);

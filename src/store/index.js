import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { persistedReducer, middleware } from './configuration';

export const store = createStore(
  persistedReducer,
  applyMiddleware(middleware, thunk)
);

export const persistor = persistStore(store);

// observable
// let currentValue = (store.getState()).session.token;
// store.subscribe(() => {
//   let previousValue = currentValue
//   currentValue = (store.getState()).session.token;

//   if (previousValue !== currentValue) {
//     API.setApiToken(currentValue);
//   }
// });

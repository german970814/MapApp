import tmpReducer from './tmp';
import userReducer from './user';
import addressReducer from './address';
import { combineReducers } from 'redux';
import navigationReducer from './navigation';

const reducer = combineReducers({
  tmp: tmpReducer,
  user: userReducer,
  address: addressReducer,
  navigation: navigationReducer,
});

export default reducer;

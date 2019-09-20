import tmpReducer from './tmp';
import userReducer from './user';
import { combineReducers } from 'redux';
import navigationReducer from './navigation';

const reducer = combineReducers({
  tmp: tmpReducer,
  user: userReducer,
  navigation: navigationReducer,
});

export default reducer;

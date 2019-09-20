import _ from 'lodash';
import { constants } from '@Actions/tmp';

const initialState = { loading: false }

const tmpReducer = (state=initialState, action) => {
  switch (action.type) {
    case constants.LOADING:
      return {
        ...state,
        loading: action.value
      }
    default:
      return state;
  }
}

export default tmpReducer;

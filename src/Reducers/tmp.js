import _ from 'lodash';
import { constants } from '@Actions/tmp';

const initialState = { loading: false }

/**
 * Reducer para objetos temporales
 * 
 * @param {Object} state El objeto estado para tmp
 * @param {Object} action La acción que se va a realizar
 */
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

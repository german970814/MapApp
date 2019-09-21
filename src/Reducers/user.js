import _ from 'lodash';
import { constants } from '@Actions/user';

const initialState = {
  data: [],
  loggedUser: {}
}

/**
 * Reducer de usuarios.
 * 
 * @param {Object} state El estado de usuarios
 * @param {Object} action La acción que se va a realizar
 */
const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case constants.CREATE_USER:
      return {
        ...state,
        data: [
          ...state.data,
          { id: state.data.length + 1, ...action.payload }
        ]
      }
    case constants.LOGIN_USER:
      return {
        ...state,
        loggedUser: action.payload
      }
  }
  return state;
}

export default userReducer;

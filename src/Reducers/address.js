import _ from 'lodash';
import { constants } from '@Actions/address';

const initialState = {
  data: [],
  currentPosition: { latitude: 10.9815841, longitude: -74.8026437 },
}

/**
 * Reducer de direcciones.
 * 
 * @param {Object} state El estado de usuarios
 * @param {Object} action La acción que se va a realizar
 */
const addressReducer = (state=initialState, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload
      }
    case constants.CREATE_ADDRESS:
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: state.data.length + 1,
            name: action.payload.name,
            userId: action.payload.user.id,
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          }
        ]
      }
  }
  return state;
}

export default addressReducer;

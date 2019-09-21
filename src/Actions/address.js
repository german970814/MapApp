import _ from 'lodash';
import { loading } from '@Actions/tmp';

const _constants = [
  'CREATE_ADDRESS',
  'SET_CURRENT_POSITION'
];
export const constants = _.zipObject(_constants, _constants);

/**
 * Acción para crear direcciones
 * 
 * @param {Object} param0 Los parámetros para crear la dirección
 */
export const createAddressAction = ({ name, latitude, longitude, user }) => ({
  type: constants.CREATE_ADDRESS,
  payload: { name, latitude, longitude, user }
});

/**
 * Acción para setear la posición actual del usuario
 * 
 * @param {Object} param0 Las coordenadas del usuario
 */
export const setCurrentPositionAddress = ({ latitude, longitude }) => ({
  payload: { latitude, longitude },
  type: constants.SET_CURRENT_POSITION,
});

/**
 * Acción de Thunk que se utiliza para encadenar acciones asociadas a la
 * creación de una dirección
 * 
 * @param {Object} param0 Los parámetros para crear la dirección
 */
export const createAddress = ({ name, latitude, longitude, user }) => {
  return (dispatch) => {
    dispatch(loading(true));
    return new Promise((resolver, reject) => {
      try {
        dispatch(createAddressAction({ name, latitude, longitude, user }));
        dispatch(loading(false));
        return resolver({ code: 'OK' });
      } catch (e) {
        dispatch(loading(false));
        return reject({ code: 'ERROR' });
      }
    });
  }
}


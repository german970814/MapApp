import _ from 'lodash'
import { loading } from '@Actions/tmp'
import { NavigationActions } from 'react-navigation'
import { checkPassword, hashPassword } from '@Utils/password'

const _constants = [
  'LOGIN_USER',
  'CREATE_USER',
  'LOGOUT_USER',
];
export const constants = _.zipObject(_constants, _constants);

/**
 * Acción para crear usuarios.
 * 
 * @param {Object} payload El objeto a ser guardado
 */
export const createUserAction = ({ name, lastName, identificationNumber, password }) => ({
  type: constants.CREATE_USER,
  payload: { name, lastName, identificationNumber, password }
});

/**
 * Accion para autentificar usuarios.
 * 
 * @param {Object} payload Los datos del usuario a autentificar
 */
export const loginUserAction = (payload) => ({
  payload,
  type: constants.LOGIN_USER,
});

/**
 * Acción para hacer logout de la sesión del usuario
 */
export const logoutUserAction = () => ({
  type: constants.LOGOUT_USER
});

/**
 * Acción que saca al usuario de la sesión y lo redirecciona al login
 */
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutUserAction());
    dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
  }
};

/**
 * Acción de Thunk para crear el proceso de creación de un usuario.
 * El usuario es creado si no existe en el arreglo de usuarios, de lo contrario,
 * envia un mensaje de error.
 * 
 * @param {Array} users Lista de usuarios en el store
 * @param {Object} param1 Los datos del usuario
 * 
 * @return {Promise}
 */
export const createUser = (users, { name, lastName, identificationNumber, password }) => {
  return (dispatch) => {
    dispatch(loading(true));
    return new Promise((resolver, reject) => {
      const newUserRecord = {
        name,
        lastName,
        identificationNumber,
        password: hashPassword(password),
      }

      dispatch(loading(false));  
      if (_.find(users, { identificationNumber })) {
        return reject({ code: 'USER_EXISTS' });
      }

      dispatch(createUserAction(newUserRecord));
      return resolver({ code: 'OK' });
    });
  }
}

/**
 * Acción de Thunk para verificar las credenciales de un usuario
 * y darle acceso a la aplicación.
 * 
 * @param {Array} users Lista de los usuarios en el store
 * @param {String} identificationNumber Identificación del usuario
 * @param {String} password Contraseña del usuario
 */
export const userLoginAttempt = (users, identificationNumber, password) => {
  return (dispatch) => {
    dispatch(loading(true));
    return new Promise((resolver, reject) => {
      const user = _.find(users, { identificationNumber });

      try {
        const authenticated = !user ? false : checkPassword(password, user.password);

        dispatch(loading(false));
        authenticated && dispatch(loginUserAction(user));

        return authenticated ?
          resolver({ code: 'OK' }) :
          reject({ code: 'INVALID_CREDENTIALS' });
      } catch (e) {
        dispatch(loading(false));
        return reject({ code: 'CHECK_FAILS' });
      }
    });
  }
};

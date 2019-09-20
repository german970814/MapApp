import _ from 'lodash';
import { loading } from '@Actions/tmp';
import { checkPassword, hashPassword } from '@Utils/password';

const _constants = [
  'LOGIN_USER',
  'CREATE_USER',
];
export const constants = _.zipObject(_constants, _constants);


export const createUserAction = ({ name, lastName, identificationNumber, password }) => ({
  type: constants.CREATE_USER,
  payload: { name, lastName, identificationNumber, password }
});

export const loginUserAction = (payload) => ({
  payload,
  type: constants.LOGIN_USER,
});

export const createUser = ({ name, lastName, identificationNumber, password }) => {
  return (dispatch) => {
    dispatch(loading(true));
    const newUserRecord = {
      name,
      lastName,
      identificationNumber,
      password: hashPassword(password),
    }
    dispatch(loading(false));
    dispatch(createUserAction(newUserRecord));
  }
}

export const userLoginAttempt = (users, identificationNumber, password) => {
  return (dispatch) => {
    dispatch(loading(true));
    const user = _.find(users, { identificationNumber });
    const authenticate = checkPassword(password, user.password);

    dispatch(loading(false));
    console.warn('Authenticated ? ', authenticate)
    // authenticate && dispatch(loginUser(user));
  }
};

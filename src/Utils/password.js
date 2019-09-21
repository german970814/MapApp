import md5 from 'md5';
import _ from 'lodash';

/**
 * Función para codificar contraseña.
 * Actualmente se usa md5 para codificar la contraseña y no
 * guardarla en texto plano.
 * 
 * @param {String} password La contraseña que será hasheada
 */
export function hashPassword(password) {
  return md5(password);
}

/**
 * Función para verificar una contraseña plana, con una previamente
 * hasheada.
 * 
 * @param {String} password La contraseña en texto plano
 * @param {String} hashedPassword La contraseña hasheada previamente
 */
export function checkPassword(password, hashedPassword) {
  return _.isEqual(md5(password), hashedPassword);
}

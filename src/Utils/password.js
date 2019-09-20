import md5 from 'md5';
import _ from 'lodash';

export function hashPassword(password) {
  return md5(password);
}

export function checkPassword(password, hashedPassword) {
  return _.isEqual(md5(password), hashPassword);
}

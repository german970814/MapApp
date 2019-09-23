import _ from 'lodash';

const _constants = [
  'LOADING',
];
export const constants = _.zipObject(_constants, _constants);


/**
 * Acción que define el estado de carga de la aplicación
 * 
 * @param {Boolean} value El valor a setear, true si está cargando, falso si no
 */
export const loading = (value) => ({
  value,
  type: constants.LOADING,
});

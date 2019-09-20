import _ from 'lodash';

const _constants = [
  'LOADING',
];
export const constants = _.zipObject(_constants, _constants);


export const loading = (value) => ({
  value,
  type: constants.LOADING,
});

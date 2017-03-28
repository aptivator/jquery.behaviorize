import $ from 'jquery';

const $eventBus = $('html').eq(0);
const dependenciesTable = {};
const validationTable = {};

export {
  $eventBus,
  dependenciesTable,
  validationTable
};

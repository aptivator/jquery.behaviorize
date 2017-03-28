import $         from 'jquery';
import _         from 'lodash';
import * as vars from '../lib/vars/vars';

$.behaviorize = configs => {
  _.each(configs, (configs, configName) => {
    _.extend(vars[configName], configs);
  });
};

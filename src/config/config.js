import $         from 'jquery';
import _         from 'lodash';
import * as vars from '../lib/vars/vars';

$.behaviorize = configs => {
  _.each(configs, (configs, configName) => {
    if(!_.isPlainObject(configs)) {
      configs = {[configName]: configs};
    }
    
    _.extend(vars[configName], configs);
  });
};

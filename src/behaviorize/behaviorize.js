import $         from 'jquery';
import _         from 'lodash';
import * as vars from '../lib/vars/vars';

$.behaviorize = configs => {
  _.each(configs, (configs, configName) => {
    if(!_.isPlainObject(configs)) {
      let configs_ = configs;
      configs = {[configName]: configs_};
    }
    
    _.extend(vars[configName], configs);
  });
  
  return vars;
};

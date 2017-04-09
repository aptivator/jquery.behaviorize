import $ from 'jquery';
import _ from 'lodash';

import {prefix, actions, validators, validationConfigs} from '../lib/vars/vars';

$.behaviorize = (configs = {}) => {
  let {prefix: prefix_, actions: actions_, validators: validators_} = configs;
  let {validationConfigs: validationConfigs_} = configs;
  
  if(prefix_) {
    _.extend(prefix, {prefix: prefix_});
  }
  
  if(actions_) {
    _.extend(actions, actions_);
  }
  
  if(validators_) {
    _.extend(validators, validators_);
  }
  
  if(validationConfigs_) {
    _.each(validationConfigs_, (configs, configName) => {
      if(_.isPlainObject(configs)) {
        _.extend(validationConfigs[configName], configs);
      } else {
        validationConfigs[configName] = configs;
      }
    });
  }
  
  return {prefix, actions, validators, validationConfigs};
};

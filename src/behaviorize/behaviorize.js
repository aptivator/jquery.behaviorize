import $ from 'jquery';
import _ from 'lodash';

import {prefix, actions, validators, validifyConfigs} from '../lib/vars/vars';

$.behaviorize = (configs = {}) => {
  let {prefix: prefix_, actions: actions_, validators: validators_} = configs;
  let {validifyConfigs: validifyConfigs_} = configs;
  
  if(prefix_) {
    _.extend(prefix, {prefix: prefix_});
  }
  
  if(actions_) {
    _.extend(actions, actions_);
  }
  
  if(validators_) {
    _.extend(validators, validators_);
  }
  
  if(validifyConfigs_) {
    _.each(validifyConfigs_, (configs, configName) => {
     _.extend(validifyConfigs[configName], configs);
    });
  }
  
  return {prefix, actions, validators, validifyConfigs};
};

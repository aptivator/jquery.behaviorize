import                 'jquery.extras';
import $          from 'jquery';
import _          from 'lodash';
import                 './config/config';
import joiner     from './lib/joiner';
import actionify  from './actionify/actionify';
import Validifier from './validify/validify';

import {prefix}  from './lib/vars/vars';

$.fn.behaviorize = function(configs, $set = $()) {
  let {prefix: pfx} = prefix;
  
  if(configs) {
    $.behaviorize(configs);
  }
  
  this.each(function() {
    $('*', this).byAttrName(pfx).each((idx, el) => {
      let $el = $(el);
      
      if(el.behaviorized) {
        return;
      }
      
      let actionPfx = joiner(pfx, 'a-');
      let validatorPfx = joiner(pfx, 'v-');
      let actions = $el.attrValues(actionPfx);
      let validators = $el.attrValues(validatorPfx);
      
      if(!_.isEmpty(actions)) {
        actionify($el, actionPfx, actions);
      }
      
      if(!_.isEmpty(validators)) {
        new Validifier($el, validatorPfx, validators);
      }
      
      if(el.actionified || el.validified) {
        el.behavioried = true;
        $set = $set.add($el);
      }
    });
  });
  
  return $set;
};

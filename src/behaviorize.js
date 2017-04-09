import                 'jquery.extras';
import $          from 'jquery';
import _          from 'lodash';
import                 './behaviorize/behaviorize';
import joiner     from './lib/joiner';
import actionify  from './actionify/actionify';
import Validifier from './validify/validify';

import {prefix}  from './lib/vars/vars';

$.fn.behaviorize = function(configs) {
  let {prefix: pfx} = prefix;
  
  if(configs) {
    $.behaviorize(configs);
  }

  return this.each(function() {
    $('*', this).add(this).byAttrName(pfx).each((idx, el) => {
      let $el = $(el);
      
      if(el.actionified || el.validified) {
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
    });
  });
};

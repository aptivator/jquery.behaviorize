import                 'jquery.extras';
import $          from 'jquery';
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
    $('*', this).byAttrName(pfx).each(function() {
      let $el = $(this);
      $set = $set.add($el);
      actionify($el, joiner(pfx, 'a-'));
      new Validifier($el, joiner(pfx, 'v-'));
    });
  });
  
  return $set;
};

import                'jquery.extras';
import $         from 'jquery';
import                './behaviorize/behaviorize';
import actionify from './actionify/actionify';
import validify  from './validify/validify';
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
      actionify($el, `${pfx}a-`);
      //validify($el, `${pfx}v-`);
    });
  });
  
  return $set;
};

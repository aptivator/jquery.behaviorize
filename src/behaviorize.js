import                'jquery.extras';
import $         from 'jquery';
import                './behaviorize/behaviorize';
import actionify from './actionify/actionify';
import {prefix}  from './lib/vars/vars';

$.fn.behaviorize = function(configs, $set = $()) {
  let {prefix: pfx} = prefix;
  
  if(configs) {
    $.behaviorize(configs);
  }
  
  this.each((idx, element) => {
    $('*', element).byAttrName(pfx).each((idx, element) => {
      let $element = $(element);
      $set = $set.add($element);
      actionify($element, `${pfx}a-`);
    });
  });
  
  return $set;
};

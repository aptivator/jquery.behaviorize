import                'jquery.extras';
import $         from 'jquery';
import                './behaviorize/behaviorize';
import actionify from './actionify/actionify';
//import validify  from './validify/validify';
import {prefix}  from './lib/vars/vars';

$.fn.behaviorize = function($set = $()) {
  let {prefix: pfx} = prefix;
  this.each((idx, element) => {
    $('*', element).byAttrName(pfx).each((idx, element) => {
      let $element = $(element);
      $set = $set.add($element);
      actionify($element, `${pfx}a-`);
      //validify($element, `${pfx}v`);
    });
  });
  
  return $set;
};

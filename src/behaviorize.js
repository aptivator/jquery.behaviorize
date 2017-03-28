import './helpers/helpers';
import './config/config';

import $         from 'jquery';
import actionify from './actionify/actionify';
import transform from './transform/transform';
import validify  from './validify/validify';
import {prefix}  from './lib/vars/vars';

$.fn.behaviorize = function($set = $()) {
  let {prefix: pfx} = prefix;
  this.each((idx, element) => {
    $('*', element).byAttr(pfx).each((idx, element) => {
      let $element = $(element);
      $set = $set.add($element);
      transform($element, `${pfx}t`);
      actionify($element, `${pfx}a`);
      validify($element, `${pfx}v`);
    });
  });
  
  return $set;
};

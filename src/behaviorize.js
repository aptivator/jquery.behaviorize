import './helpers/helpers';
import './config/config';

import $         from 'jquery';
import actionify from './actionify/actionify';
import transform from './transform/transform';
import validify  from './validify/validify';

let _directifyRx = /^bx[vtar]?-/;
let _pfx = 'bx-';
let _transformPfx = 'bxt-';
let _actionPfx = 'bxa-';
let _validationPfx = 'bxv-';

$.fn.behaviorize = function($set = $()) {
  this.each((idx, element) => {
    $('*', element).byAttr(_directifyRx).each((idx, element) => {
      let $element = $(element);
      $set = $set.add($element);
      transform($element);
      actionify($element);
      validify($element);
    });
  });
  
  return $set;
};

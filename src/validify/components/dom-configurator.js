import _       from 'lodash';
import classer from '../lib/classer';

import {validationConfigs} from '../../lib/vars/vars';

export default function() {
  let {$el, elHandle} = this.vars;
  let {elementContainer} = validationConfigs.selectors;
  let $elContainer = elementContainer ? $el.closest(elementContainer) : undefined;
  let $errorContainer = $('<div/>');
  
  classer($el, 'element', true).addClass(elHandle);
  classer($errorContainer, 'errorContainer', true).addClass(elHandle);
  classer($elContainer, 'elementContainer', true).addClass(elHandle);
  
  _.extend(this.vars, {$elContainer, $errorContainer});
  
  return this;
}

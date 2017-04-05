import _       from 'lodash';
import classer from '../lib/classer';

import {validifyConfigs} from '../../lib/vars/vars';

export default function() {
  let {$el, elHandle} = this.vars;
  let {elementContainer} = validifyConfigs.selectors;
  let $elContainer = elementContainer ? $el.closest(elementContainer) : null;
  let $errorContainer = $('<div/>');
  
  classer($el, 'element', true).addClass(elHandle);
  classer($errorContainer, 'errorContainer', true).addClass(elHandle);
  classer($elContainer, 'elementContainer', true).addClass(elHandle);
  
  _.extend(this.vars, {$elContainer, $errorContainer});
  
  return this;
}

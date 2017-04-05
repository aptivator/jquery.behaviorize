import _ from 'lodash';

import {validifyConfigs} from '../../lib/vars/vars';

export default function() {
  let {$el, elHandle} = this.vars;
  let {classes, selectors} = validifyConfigs;
  let {elementContainer} = selectors;
  let $elContainer = elementContainer ? $el.closest(elementContainer) : null;
  let $errorContainer = $('<div/>');
  
  $el.addClass(classes.element.error).addClass(elHandle);
  $errorContainer.addClass(classes.errorContainer.error);
  $errorContainer.addClass(elHandle);
  
  if($elContainer) {
    $elContainer.addClass(elHandle);
    $elContainer.addClass(classes.elementContainer.error);
  }
  
  _.extend(this.vars, {$elContainer, $errorContainer});
  
  return this;
}

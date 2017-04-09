import isForm        from '../lib/is-form';
import eventAssessor from '../lib/event-assessor';

import {validationConfigs} from '../../lib/vars/vars';

export default function() {
  let {executor} = this;
  let {validateOnStart, selectors} = validationConfigs;
  let {errorSibling} = selectors;
  let {$el, $errorContainer, $mainEl} = this.vars;
  let $errorSibling = errorSibling ? $el.closest(errorSibling) : $el;

  $el.on(eventAssessor($el), executor);
  
  if($errorContainer.length) {
    $errorContainer.insertAfter($errorSibling);
  }
  
  if(validateOnStart) {
    executor();
  }

  if($mainEl && isForm($mainEl)) {
    $mainEl.on('reset', executor);
  }
}

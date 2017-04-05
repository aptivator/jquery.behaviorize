import _ from 'lodash';

import {validifyConfigs} from '../../lib/vars/vars';
import {$eventBus} from '../lib/vars';

export default function() {
  let {classes} = validifyConfigs;
  let {elChangeHandle, validatorsCount, validationsTable} = this.vars;
  let {$elContainer, $errorContainer} = this.vars;
  
  $eventBus.on(elChangeHandle, (evt, validatorName, valid) => {
    validationsTable[validatorName] = valid;
    let numberValid = _.reduce(validationsTable, (sum, valid) => sum += valid);
    if(numberValid === validatorsCount) {
      if($elContainer) {
        $elContainer.removeClass(classes.elementContainer.error);
        $elContainer.addClass(classes.elementContainer.default);
      }
      
      $errorContainer.removeClass(classes.errorContainer.error);
      return $errorContainer.addClass(classes.errorContainer.default);
    }
    
    if($elContainer) {
      $elContainer.addClass(classes.elementContainer.error);
      $elContainer.removeClass(classes.elementContainer.default);
    }
    
    $errorContainer.addClass(classes.errorContainer.error);
    $errorContainer.removeClass(classes.errorContainer.default);
  });
  
  return this;
}

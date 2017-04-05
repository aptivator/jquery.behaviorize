import _       from 'lodash';
import classer from '../lib/classer';

import {$eventBus} from '../lib/vars';

export default function() {
  let {elChangeHandle, validatorsCount, validationsTable} = this.vars;
  let {$elContainer, $errorContainer} = this.vars;
  
  $eventBus.on(elChangeHandle, (evt, validatorName, valid) => {
    validationsTable[validatorName] = valid;
    let numberValid = _.reduce(validationsTable, (sum, valid) => sum += valid);
    if(numberValid === validatorsCount) {
      classer($elContainer, 'elementContainer');
      return classer($errorContainer, 'errorContainer');
    }
    
    classer($elContainer, 'elementContainer', true);
    classer($errorContainer, 'errorContainer', true);
  });
  
  return this;
}

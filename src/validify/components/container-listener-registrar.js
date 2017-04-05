import _       from 'lodash';
import classer from '../lib/classer';

import {$eventBus, validationTable} from '../lib/vars';

export default function() {
  let {$mainEl, mainId, mainHandle} = this.vars;
  let classHash = 'mainContainer';
  
  if(!$eventBus.hasEvent(mainHandle)) {
    $eventBus.on(mainHandle, (evt, id, valid) => {
      validationTable[mainId][id] = valid;
      let numberValid = _.reduce(validationTable[mainId], (sum, valid) => sum += valid);
      let totalInputs = _.keys(validationTable[mainId]).length;
      if(numberValid === totalInputs) {
        return classer($mainEl, classHash);
      }
      
      classer($mainEl, classHash, true);
    });
  }

  return this;
}

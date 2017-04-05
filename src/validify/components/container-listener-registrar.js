import _ from 'lodash';

import {validifyConfigs} from '../../lib/vars/vars';
import {$eventBus, validationTable} from '../lib/vars';

export default function() {
  let {$mainEl, mainId, mainHandle} = this.vars;
  let {classes} = validifyConfigs;
  
  if(!$eventBus.hasEvent(mainHandle)) {
    $eventBus.on(mainHandle, (evt, id, valid) => {
      validationTable[mainId][id] = valid;
      let numberValid = _.reduce(validationTable[mainId], (sum, valid) => sum += valid);
      let totalInputs = _.keys(validationTable[mainId]).length;
      if(numberValid === totalInputs) {
        $mainEl.addClass(classes.mainContainer.default);
        return $mainEl.removeClass(classes.mainContainer.error);
      }
      
      $mainEl.addClass(classes.mainContainer.error);
      $mainEl.removeClass(classes.mainContainer.default);
    });
  }
  
  return this;
}

import _ from 'lodash';

import {validifyConfigs} from '../../lib/vars/vars';
import {$eventBus} from '../lib/vars';

export default function() {
  let {validateAll} = validifyConfigs;
  let {elementValidators, elementHandle, id, mainHandle} = this.vars;
  
  this.executor = _.debounce(() => {
    let valid = true;
    for(let validator of elementValidators) {
      if(!(valid = validator()) && !validateAll) {
        break;
      }
    }
    
    $eventBus.trigger(elementHandle);
    $eventBus.trigger(mainHandle, [id, valid]);
  });
  
  return this;
}

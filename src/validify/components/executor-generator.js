import _ from 'lodash';

import {validationConfigs} from '../../lib/vars/vars';
import {$eventBus} from '../lib/vars';

export default function() {
  let {validateAll} = validationConfigs;
  let {elementValidators, elHandle, id, mainHandle} = this.vars;
  
  this.executor = _.debounce(() => {
    let valid = true;
    for(let validator of elementValidators) {
      if(!(valid = validator()) && !validateAll) {
        break;
      }
    }

    $eventBus.trigger(elHandle);
    $eventBus.trigger(mainHandle, [id, valid]);
  });
  
  return this;
}

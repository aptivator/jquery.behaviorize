import _                  from 'lodash';
import configsTransformer from '../../lib/configs-transformer';
import joiner             from '../../lib/joiner';
import classer            from '../lib/classer';
import varToName          from '../lib/var-to-name';

import {validifyConfigs, validators} from '../../lib/vars/vars';
import {$eventBus} from '../lib/vars';

export default function() {
  let {vars} = this;
  let {$el, $elContainer = $(), $deps, $errorContainer} = vars;
  let {depNames, elValidators, pfx, elChangeHandle, validationsTable} = vars;
  let {elementValidators} = vars;

  _.each(elValidators, (configs, validatorName) => {
    validatorName = validatorName.replace(pfx, '');
    configs = configsTransformer(configs);
    validationsTable[validatorName] = false;
    let {silent, disable} = _.isPlainObject(configs) ? configs : {};
    let name = varToName($el.name());
    let specificErrorClass = joiner(pfx, 'error-', validatorName);
    let definition = validators[validatorName];
    let notifierParams = {$el, configs, name, $deps, depNames};
    
    if(!definition) {
      throw new Error(`validator [${validatorName}] was not defined`);
    }
    
    let {notifier = _.noop, validator} = definition;
    let errorMessage = !silent && notifier(notifierParams);
    let $errorMessage = $();
    
    if(errorMessage) {
      classer($errorMessage = $('<div/>'), 'errorMessage', true)
        .text(errorMessage)
        .addClass(specificErrorClass)
        .appendTo($errorContainer);
    }
    
    let isDep = validatorName === 'deps';
    
    let elementValidator = evt => {
      let classOp = 'addClass';
      let depValues = $deps.val('name', true);
      let result = validator({
        $el, name, configs, $deps, value: $el.val(),
        depNames, depValues, validifyConfigs
      });
      
      if(!result) {
        if(isDep && disable) {
          $el.disable();
        }
        
        classer($errorMessage, 'errorMessage', true);
        classer($el, 'element', true);
      } else {
        classOp = 'removeClass';
        
        if(isDep && disable) {
          $el.enable();
        }
        
        classer($errorMessage, 'errorMessage');
        classer($el, 'element');
      }
      
      [$el, $errorContainer, $errorMessage, $elContainer].forEach($el => {
        $el[classOp](specificErrorClass);
      });

      $eventBus.trigger(elChangeHandle, [validatorName, result]);
      
      return result;
    };
    
    elementValidators.push(elementValidator);
  });
  
  return this;
}

import _                  from 'lodash';
import configsTransformer from '../../lib/configs-transformer';
import joiner             from '../../lib/joiner';
import varToName          from '../lib/var-to-name';

import {validifyConfigs, validators} from '../../lib/vars/vars';
import {$eventBus} from '../lib/vars';

export default function() {
  let {classes} = validifyConfigs;
  let {vars} = this;
  let {$el, $elContainer, $deps, $errorContainer, validationsTable} = vars;
  let {depNames, elValidators, pfx, elChangeHandle} = vars;
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
    
    if(errorMessage) {
      var $errorMessage = $('<div/>');
      
      $errorMessage
        .text(errorMessage)
        .addClass(classes.errorMessage.error)
        .addClass(specificErrorClass)
        .appendTo($errorContainer);
    }
    
    let elementValidator = evt => {
      let classOp = 'addClass';
      let depValues = $deps.val('name', true);
      let isDep = validatorName === 'deps';
      let result = validator({
        $el, name, configs, $deps, value: $el.val(),
        depNames, depValues, validifyConfigs
      });
      
      if(!result) {
        if(isDep && disable) {
          $el.disable();
        }
        
        if(errorMessage) {
          $errorMessage.removeClass(classes.errorMessage.default);
          $errorMessage.addClass(classes.errorMessage.error);
        }
        
        $el.removeClass(classes.element.default);
        $el.addClass(classes.element.error);
      } else {
        classOp = 'removeClass';
        
        if(isDep && disable) {
          $el.enable();
        }
        
        if(errorMessage) {
          $errorMessage.removeClass(classes.errorMessage.error);
          $errorMessage.addClass(classes.errorMessage.default);
        }
        
        $el.removeClass(classes.element.error);
        $el.addClass(classes.element.default);
      }
      
      $el[classOp](specificErrorClass);
      
      if($errorContainer.length) {
        $errorContainer[classOp](specificErrorClass);
      }
      
      if(errorMessage) {
        $errorMessage[classOp](specificErrorClass);
      }

      if($elContainer) {
        $elContainer[classOp](specificErrorClass);
      }
      
      $eventBus.trigger(elChangeHandle, [validatorName, result]);
      
      return result;
    };
    
    elementValidators.push(elementValidator);
  });
  
  return this;
}

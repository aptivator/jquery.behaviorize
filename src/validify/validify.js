import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import dependenciesGetter from './lib/dependencies-getter';
import eventAssessor      from './lib/event-assessor';
import isForm             from './lib/is-form';
import varToName          from './lib/var-to-name';

import {validifyConfigs, validators} from '../lib/vars/vars';
import {$eventBus, dependenciesTable, validationTable} from './lib/vars';

export default ($el, pfx) => {
  let validatorConfigs = $el.attrValues(pfx);
  
  if(_.isEmpty(validatorConfigs)) {
    return;
  }
  
  let {selectors, classes, validateAll, validateOnStart} = validifyConfigs;
  let {mainContainer$, elementContainer$, errorSibling$} = selectors;
  let id = $el.id(true);
  let elementHandle = `${pfx}${id}`;
  let elementValidators = [];
  let $mainEl = $el.closest(mainContainer$ || 'form');
  let containerId = $mainEl.id(true);
  let containerHandle = `${pfx}${containerId}`;
  let specificFieldClass = `${pfx}field-${id}`;
  let depConfigs = configsTransformer(validatorConfigs[`${pfx}deps`]);
  let $deps = dependenciesGetter(depConfigs, $el, $mainEl);
  let dependencyNames = [];
  
  let executor = _.debounce(() => {
    let valid = true;
    for(let validator of elementValidators) {
      if(!validator()) {
        valid = false;
        if(!validateAll) {
          break;
        }
      }
    }
    $eventBus.trigger(elementHandle);
    $eventBus.trigger(containerHandle, [id, valid]);
  });
  
  $el.addClass(classes.element.error).addClass(specificFieldClass);
  
  if(!validationTable[containerId]) {
    validationTable[containerId] = {};
  }
  
  validationTable[containerId][id] = false;
  
  if(!$eventBus.hasEvent(containerHandle)) {
    $eventBus.on(containerHandle, (evt, id, valid) => {
      validationTable[containerId][id] = valid;
      let numberValid = _.reduce(validationTable[containerId], (sum, valid) => sum += valid);
      let totalInputs = _.keys(validationTable[containerId]).length;
      if(numberValid === totalInputs) {
        $mainEl.addClass(classes.mainContainer.default);
        return $mainEl.removeClass(classes.mainContainer.error);
      }
      
      $mainEl.addClass(classes.mainContainer.error);
      $mainEl.removeClass(classes.mainContainer.default);
    });
  }
  
  $deps.each(function() {
    let $dependency = $(this);
    let name = $dependency.name();
    
    if(!name) {
      throw new Error(`one of the dependencies does not have a name`);
    }
    
    dependencyNames.push(varToName(name));
    
    let dependencyId = $dependency.id(true);
    let dependencyHandle = `${pfx}${dependencyId}`;
    let table = dependenciesTable[containerId];
    
    if(!table) {
      table = dependenciesTable[containerId] = [];
    }
    
    if(table[id] && table.includes(dependencyId)) {
      throw new Error(`[${id}] and [${dependencyId}] depend on each other`);
    }
    
    table.push(id);
    $eventBus.on(dependencyHandle, executor);
  });
  
  let $errorSibling = errorSibling$ ? $el.closest(errorSibling$) : $el;
  let $elContainer = elementContainer$ ? $el.closest(elementContainer$) : null;
  let elementValidationChangeHandle = `${elementHandle}-validation-change`;
  let totalValidators = _.keys(validatorConfigs).length;
  let validationsTable = {};
  let $errorContainer = $('<div/>');
  
  $errorContainer.addClass(classes.errorContainer.error);
  $errorContainer.addClass(specificFieldClass);
  
  if($elContainer) {
    $elContainer.addClass(specificFieldClass);
    $elContainer.addClass(classes.elementContainer.error);
  }
  
  $eventBus.on(elementValidationChangeHandle, (evt, validatorName, valid) => {
    validationsTable[validatorName] = valid;
    let numberValid = _.reduce(validationsTable, (sum, valid) => sum += valid);
    if(numberValid === totalValidators) {
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
  
  _.each(validatorConfigs, (configs, validatorName) => {
    validatorName = validatorName.replace(pfx, '');
    validationsTable[validatorName] = false;
    configs = configsTransformer(configs);
    let depValidator = validatorName === 'deps';
    let {silent, disable} = _.isPlainObject(configs) ? configs : {};
    let name = varToName($el.name());
    let specificErrorClass = `${pfx}error-${validatorName}`;
    let definition = validators[validatorName];
    let notifierParams = {$el, configs, name, $deps, dependencyNames};
    
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
      let dependencyValues = $deps.val('name', true);
      
      let result = validator({
        $el, name, configs, $deps, value: $el.val(),
        dependencyNames, dependencyValues, validifyConfigs
      });
      
      if(!result) {
        if(depValidator && disable) {
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
        
        if(depValidator && disable) {
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
      
      $eventBus.trigger(elementValidationChangeHandle, [validatorName, result]);
      
      return result;
    };
    
    elementValidators.push(elementValidator);
  });
  
  $el.on(eventAssessor($el), executor);
  
  if($errorContainer.length) {
    $errorContainer.insertAfter($errorSibling);
  }
  
  if(validateOnStart) {
    executor();
  }
  
  if(isForm($mainEl)) {
    $mainEl.on('reset', executor);
  }
};

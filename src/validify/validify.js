import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import dependenciesGetter from './lib/dependencies-getter';
import eventAssessor      from './lib/event-assessor';
import varToName          from './lib/var-to-name';

import {validatorConfigs, validators as validators_} from '../lib/vars/vars';
import {$eventBus, dependenciesTable, validationTable} from './lib/vars';

export default ($element, prefix) => {
  let validators = $element.attrValues(prefix);
  
  if(_.isEmpty(validators)) { 
    return;
  }
  
  let event = eventAssessor($element);
  let {selectors, classes, validateAll, validateOnStart} = validatorConfigs;
  let id = $element.id() || $element.id(true);
  let elementHandle = `${prefix}${id}`;
  let elementValidators = [];
  let $mainContainer = $element.closest(selectors.mainContainer || 'form');
  let containerId = $mainContainer.id() || $mainContainer.id(true);
  let elementChangeHandle = `${prefix}${containerId}`;
  let specificFieldClass = `${prefix}field-${id}`;
  let depConfigs = configsTransformer(validators[`${prefix}deps`]);
  let $deps = dependenciesGetter(depConfigs, $element, $mainContainer);
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
    $eventBus.trigger(elementChangeHandle, [id, valid]);
  }, 0);
  
  $element.addClass(classes.element.error).addClass(specificFieldClass);
  
  if(!validationTable[containerId]) {
    validationTable[containerId] = {};
  }
  
  validationTable[containerId][id] = false;
  
  if(!$eventBus.hasEvent(elementChangeHandle)) {
    $eventBus.on(elementChangeHandle, (evt, id, valid) => {
      validationTable[containerId][id] = valid;
      let numberValid = _.reduce(validationTable[containerId], (sum, valid) => sum += valid);
      let totalInputs = _.keys(validationTable[containerId]).length;
      if(numberValid === totalInputs) {
        return $mainContainer.addClass(classes.mainContainer.default).removeClass(classes.mainContainer.error);
      }
      $mainContainer.addClass(classes.mainContainer.error).removeClass(classes.mainContainer.default);
    });
  }
  
  $deps.each((idx, dependency) => {
    let $dependency = $(dependency);
    let name = $dependency.attr('name');
    if(!name) { 
      throw new Error(`one of the dependencies does not have a name`);
    }
    
    dependencyNames.push(varToName(name));
    
    let dependencyHandle = `${prefix}${$dependency.id() || $dependency.id(true)}`;
    let table = dependenciesTable[containerId];
    
    if(!table) {
      table = dependenciesTable[containerId] = [];
    }
    
    if(table[id] && table.includes($dependency.id())) {
      throw new Error(`dependencies [${id}] and [${$dependency.id()}] depend on each other`);
    }
    table.push(id);
    $eventBus.on(dependencyHandle, executor);
  });
  
  let $errorSibling = selectors.errorSibling ? $element.closest(selectors.errorSibling) : $element;
  let $elementContainer = selectors.elementContainer ? $element.closest(selectors.elementContainer) : null;
  let $errorContainer = $('<div/>').addClass(classes.errorContainer.error).addClass(specificFieldClass);
  let elementValidationChangeHandle = `${elementHandle}-validation-change`;
  let validationsTable = {};
  let totalValidators = _.keys(validators).length;
  
  $elementContainer && $elementContainer.addClass(specificFieldClass).addClass(classes.elementContainer.error);
  
  $eventBus.on(elementValidationChangeHandle, (evt, validator, valid) => {
    validationsTable[validator] = valid;
    let numberValid = _.reduce(validationsTable, (sum, valid) => sum += valid);
    if(numberValid === totalValidators) {
      $elementContainer && $elementContainer.removeClass(classes.elementContainer.error).addClass(classes.elementContainer.default);
      return $errorContainer.removeClass(classes.errorContainer.error).addClass(classes.errorContainer.default);
    }
    $elementContainer && $elementContainer.addClass(classes.elementContainer.error).removeClass(classes.elementContainer.default);
    $errorContainer.addClass(classes.errorContainer.error).removeClass(classes.errorContainer.default);
  });
  
  _.each(validators, (configs, validator) => {
    validator = validator.replace(prefix, '');
    validationsTable[validator] = false;
    configs = configsTransformer(configs);
    let depValidator = validator === 'deps';
    let silent = false;
    let disable = false;
    let name = varToName($element.attr('name'));
    let specificErrorClass = `${prefix}error-${validator}`;
    let definition = validators_[validator];
    let messageParams = {$element, configs, name, $deps, dependencyNames};
    
    if(!definition) {
      throw new Error(`validator [${validator}] was not defined`);
    }
    
    if(_.isObject(configs)) {
      silent = configs.silent;
      disable = configs.disable;
    }
    
    let errorMessage = !silent && definition.message && definition.message(messageParams) || '';
    
    if(errorMessage) {
      var $errorMessage = $('<div/>').text(errorMessage).addClass(classes.errorMessage.error)
        .addClass(specificErrorClass).appendTo($errorContainer);
    }
    
    let validatorMethod = evt => {
      let op = 'addClass';
      let dependencyValues = {};
      $deps.each((idx, dependency) => {
        let $dependency = $(dependency);
        dependencyValues[$dependency.attr('name')] = $dependency.val();
      });
      
      let result = definition.validator({
        $element, name, configs, $deps, value: $element.val(),
        dependencyNames, dependencyValues, validationConfigs: validatorConfigs
      });
      
      if(!result) {
        depValidator && disable && $element.disable();
        $errorMessage && $errorMessage.removeClass(classes.errorMessage.default).addClass(classes.errorMessage.error);
        $element.removeClass(classes.element.default).addClass(classes.element.error);
      } else {
        op = 'removeClass';
        depValidator && disable && $element.enable();
        $errorMessage && $errorMessage.removeClass(classes.errorMessage.error).addClass(classes.errorMessage.default);
        $element.removeClass(classes.element.error).addClass(classes.element.default);
      }
      
      $element[op](specificErrorClass);
      $errorContainer.size() && $errorContainer[op](specificErrorClass);
      $errorMessage && $errorMessage[op](specificErrorClass);
      $elementContainer && $elementContainer[op](specificErrorClass);
      $eventBus.trigger(elementValidationChangeHandle, [validator, result]);
      return result;
    };
    
    elementValidators.push(validatorMethod);
  });
  
  $element.on(event, executor);
  
  if($errorContainer.length) {
    $errorContainer.insertAfter($errorSibling);
  }
  
  if(validateOnStart) {
    executor();
  }
  
  if($mainContainer[0].tagName === 'FORM') {
    $mainContainer.on('reset', executor);
  }
};

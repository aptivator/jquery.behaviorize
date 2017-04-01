import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import {actions}          from '../lib/vars/vars';

export default ($el, pfx) => {
  _.each($el.attrValues(pfx), (configs, actionName) => {
    actionName = actionName.replace(pfx, '');
    let {[actionName]: actionRecord} = actions;
    
    if(!actionRecord) {
      throw new Error(`action [${actionName}] is not defined`);
    }
    
    if(_.isFunction(actionRecord)) {
      actionRecord = {init: actionRecord};
    }
    
    configs = configsTransformer(configs);
    
    let {init, action} = actionRecord;
    let params = {$el, configs};
    
    if(init) {
      actionRecord.init(params);
    }

    if(action) {
      let {events} = _.isPlainObject(configs) ? configs : {};
      
      if(!events) {
        ({events = 'click'} = actionRecord);
      }
      
      if(_.isArray(events)) {
        events = events.join(' ');
      }
      
      $el.on(events, evt => actionRecord.action(_.extend(params, {evt})));
    }
  });
};

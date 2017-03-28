import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import {actions}          from '../lib/vars/vars';

export default ($element, pfx) => {
  _.each($element.attrValues(pfx), (configs, action) => {
    action = action.replace(pfx, '');
    configs = configsTransformer(configs) || {};
    let {events: primaryEvents} = configs;
    let params = {$element, configs};
    let {action: action_} = actions;
    let {init, events: secondaryEvents = 'click'} = action_;
    let events = primaryEvents || secondaryEvents;
    
    if(init) {
      action_.init(params);
    }

    $element.on(events, evt => action_.action(_.extend(params, {evt})));
  });
};

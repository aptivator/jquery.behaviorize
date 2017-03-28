import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import {actions}          from '../lib/vars/vars';

export default $element => {
  _.each($element.attrValues(_actionPfx), (configs, action) => {
    action = action.replace(_actionPfx, '');
    configs = configsTransformer(configs);
    let events = (configs && configs.events) || actions[action].events || 'click';
    let params = {$element, configs};
    actions[action].init && actions[action].init(params);
    $element.on(events, evt => {
      evt.preventDefault();
      actions[action].action(params);
    });
  });
};

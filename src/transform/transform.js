import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import {transforms}       from '../lib/vars/vars';

export default $element => {
  _.each($element.attrValues(_transformPfx), (configs, transform) => {
    transform = transform.replace(_transformPfx, '');
    configs = configsTransformer(configs);
    transforms[transform]({$element, configs});
  });
};

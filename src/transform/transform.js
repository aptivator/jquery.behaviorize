import _                  from 'lodash';
import configsTransformer from '../lib/configs-transformer';
import {transforms}       from '../lib/vars/vars';

export default ($element, pfx) => {
  _.each($element.attrValues(pfx), (configs, transform) => {
    transform = transform.replace(pfx, '');
    configs = configsTransformer(configs);
    transforms[transform]({$element, configs});
  });
};

import $ from 'jquery';
import _ from 'lodash';

export default (depConfigs, $el, $container) => {
  if(!_.isPlainObject(depConfigs)) {
    depConfigs = {selector: depConfigs};
  }
  
  return $(depConfigs.selector, $container).not($el);
};

import $ from 'jquery';
import _ from 'lodash';

export default (depConfigs, $element, $mainContainer) => {
  if(!_.isObject(depConfigs)) {
    depConfigs = {selector: depConfigs};
  }
  
  return $(depConfigs.selector, $mainContainer).not($element);
};

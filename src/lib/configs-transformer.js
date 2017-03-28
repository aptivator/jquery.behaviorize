import _       from 'lodash';
import jsonify from './jsonify/jsonify';

let objRx = /^\{/;
let commaRx = /\s*,\s*/g;

export default configs => {
  if(!objRx.test(configs)) { 
    return configs; 
  }
  
  configs = jsonify(configs.trim());
  let {deps, use} = configs;
  
  if(deps) {
    deps = deps.split(commaRx);
  }
  
  if(use) {
    use = use.split(commaRx);
  }
  
  return _.extend(configs, {deps, use});
};

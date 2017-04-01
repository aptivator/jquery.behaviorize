import $ from 'jquery';

const objRx = /^\s*\{/;

export default configs => {
  if(!objRx.test(configs)) { 
    return configs; 
  }
  return $.jsonify(configs.trim());
};

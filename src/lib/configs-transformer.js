import $ from 'jquery';

export default configs => {
  if(!/^\s*\{/.test(configs)) { 
    return configs; 
  }
  return $.jsonify(configs.trim());
};

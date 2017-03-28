import _         from 'lodash';
import replacers from './lib/replacers';

export default json => {
  if(!_.isString(json)) { 
    return json; 
  }

  for(let [rx, replacer] of replacers.values) {
    json = json.replace(rx, replacer);
  }
  
  return JSON.parse(json);
};

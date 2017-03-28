import _ from 'lodash';

const varNameRx = /(?:[_-]+)|(?:\B(?=[A-Z]))/g;

export default varName => {
  if(!varName) { 
    return ''; 
  }
  
  varName = varName.split(varNameRx).map(name => name.toLowerCase());
  varName[0] = _.capitalize(varName[0]);
  return varName.join(' ');
};

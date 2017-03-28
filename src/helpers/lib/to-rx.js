import _ from 'lodash';

export default rx => {
  if(!rx) {
    rx = '';
  }
  
  if(_.isString(rx)) {
    return new RegExp(`^${rx}`);
  }
  
  return rx;
};

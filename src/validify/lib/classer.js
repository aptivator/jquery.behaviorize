import {validationConfigs} from '../../lib/vars/vars';

export default ($el = $(), classHash, err) => {
  let {error, default: default_} = validationConfigs.classes[classHash];
  let classes = [error, default_];
  
  if(err) {
    [default_, error] = classes;
  }
  
  return $el.addClass(default_).removeClass(error);
};

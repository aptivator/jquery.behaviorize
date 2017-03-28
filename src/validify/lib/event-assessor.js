const elementTypes = ['button', 'checkbox'];
const elementTagNames = ['SELECT'];

export default $element => {
  let {tagName, type} = $element[0];
  
  if(elementTypes.includes(type)) {
    return 'click';
  }
  
  if(elementTagNames.includes(tagName)) {
    return 'change';
  }
  
  return 'keyup';
};

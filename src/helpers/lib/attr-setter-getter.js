export default ($el, attrName, attrValue) => {
  if(attrValue) {
    $el.attr(attrName, attrValue);
  }  
  
  return $el.attr(attrName);
};

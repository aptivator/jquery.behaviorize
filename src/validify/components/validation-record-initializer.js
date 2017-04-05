import {validationTable} from '../lib/vars';

export default function() {
  let {id, mainId} = this.vars;
  
  if(!validationTable[mainId]) {
    validationTable[mainId] = {};
  }
  
  validationTable[mainId][id] = false;

  return this;
}

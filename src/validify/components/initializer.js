import _      from 'lodash';
import joiner from '../../lib/joiner';

import {validifyConfigs} from '../../lib/vars/vars';

export default function($el, pfx, elValidators) {
  let validatorsCount = _.keys(elValidators).length;
  let validationsTable = {};
  let {mainContainer} = validifyConfigs.selectors;
  let $mainEl = $el.closest(mainContainer || 'form');
  let id = $el.id(true);
  let mainId = $mainEl.id(true);
  let elHandle = joiner(pfx, id);
  let mainHandle = joiner(pfx, mainId);
  let elChangeHandle = joiner(elHandle, '-validation-change');
  
  _.extend(this.vars = {}, {
    elementValidators: [], 
    $el, 
    id, 
    mainId, 
    pfx, 
    elHandle,
    elChangeHandle,
    elValidators, 
    mainHandle,
    validatorsCount,
    validationsTable
  });
  
  return this;
}

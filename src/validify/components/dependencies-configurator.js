import _                  from 'lodash';
import configsTransformer from '../../lib/configs-transformer';
import joiner             from '../../lib/joiner';
import dependenciesGetter from '../lib/dependencies-getter';
import varToName          from '../lib/var-to-name';

import {$eventBus, dependenciesTable} from '../lib/vars';

export default function() {
  let {$el, $mainEl, pfx, id, mainId, elValidators} = this.vars;
  let depHash = joiner(pfx, 'deps');
  let depConfigs = elValidators[depHash];
  
  if(!depConfigs) {
    return this;
  }
  
  depConfigs = configsTransformer(depConfigs);
  let $deps = dependenciesGetter(depConfigs, $el, $mainEl);
  let depNames = [];
  
  $deps.each((idx, el) => {
    let $dep = $(el);
    let name = $dep.name();
    
    if(!name) {
      throw new Error(`one of the dependencies does not have a name`);
    }
    
    let depId = $dep.id(true);
    let depHandle = joiner(pfx, depId);
    let table = dependenciesTable[mainId];
    
    if(!table) {
      table = dependenciesTable[mainId] = [];
    }
    
    if(table[id] && table.includes(depId)) {
      throw new Error(`[${id}] and [${depId}] depend on each other`);
    }
    
    table.push(id);
    $eventBus.on(depHandle, this.executor);
    depNames.push(varToName(name));
  });    
  
  _.extend(this.vars, {depNames});
  
  return this;
}

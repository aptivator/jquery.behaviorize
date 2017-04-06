import {$eventBus} from '../lib/vars';

export default function() {
  let {$el, elHandle, elChangeHandle, $mainEl, mainHandle} = this.vars;
  
  $el.on('remove', () => {
    $eventBus.off(elHandle).off(elChangeHandle);
  });
  
  if(!$mainEl.hasEvent('remove')) {
    $mainEl.on('remove', () => {
      $eventBus.off(mainHandle);
    });  
  }
  
  return this;
}

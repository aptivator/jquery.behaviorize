import $ from 'jquery';

($ => {
  $.event.special.remove = {
    remove(handlerObj) {
      let {handler} = handlerObj;
      if(handler) {
        handler();
      }
    }
  };
})($);

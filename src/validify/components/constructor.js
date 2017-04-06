import _ from 'lodash';

export default function($el, pfx) {
  let elValidators = $el.attrValues(pfx);
  let [el] = $el;

  if(_.isEmpty(elValidators) || el.validified) {
    return;
  }

  el.validified = true;

  this
    .initializer($el, pfx, elValidators)
    .executorGenerator()
    .dependenciesConfigurator()
    .validationRecordInitializer()
    .containerListenerRegistrar()
    .DOMConfigurator()
    .elementChangeListenerRegistrar()
    .validatorsSetter()
    .finalizer();
}

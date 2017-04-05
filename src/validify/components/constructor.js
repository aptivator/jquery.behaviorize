import _ from 'lodash';

export default function($el, pfx) {
  let elValidators = $el.attrValues(pfx);
  
  if(_.isEmpty(elValidators)) {
    return;
  }

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

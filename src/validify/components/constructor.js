export default function($el, pfx, validators) {
  $el.get(0).validified = true;
  
  this
    .initializer($el, pfx, validators)
    .eventHandlersUnwinder()
    .executorGenerator()
    .dependenciesConfigurator()
    .validationRecordInitializer()
    .containerListenerRegistrar()
    .DOMConfigurator()
    .elementChangeListenerRegistrar()
    .validatorsSetter()
    .finalizer();
}

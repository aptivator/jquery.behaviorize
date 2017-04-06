import _                              from 'lodash';
import constructor                    from './components/constructor';
import initializer                    from './components/initializer';
import eventHandlersUnwinder          from './components/event-handlers-unwinder';
import executorGenerator              from './components/executor-generator';
import dependenciesConfigurator       from './components/dependencies-configurator';
import validationRecordInitializer    from './components/validation-record-initializer';
import containerListenerRegistrar     from './components/container-listener-registrar';
import DOMConfigurator                from './components/dom-configurator';
import elementChangeListenerRegistrar from './components/element-change-listener-registrar';
import validatorsSetter               from './components/validators-setter';
import finalizer                      from './components/finalizer';

_.extend(constructor.prototype, {
  initializer,
  eventHandlersUnwinder,
  executorGenerator,
  dependenciesConfigurator,
  validationRecordInitializer,
  containerListenerRegistrar,
  DOMConfigurator,
  elementChangeListenerRegistrar,
  validatorsSetter,
  finalizer
});

export default constructor;

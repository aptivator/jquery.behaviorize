import _                           from 'lodash';
import constructor                 from './components/constructor';
import initializer                 from './components/initializer';
import executorGenerator           from './components/executor-generator';
import dependenciesConfigurator    from './components/dependencies-configurator';
import validationRecordInitializer from './components/validation-record-initializer';
import containerListenerRegistrar  from './components/container-listener-registrar';
import DOMConfigurator             from './components/dom-configurator';
import validatorsSetter            from './components/validators-setter';
import finalizer                   from './components/finalizer';

_.extend(constructor.prototype, {
  initializer,
  executorGenerator,
  dependenciesConfigurator,
  validationRecordInitializer,
  containerListenerRegistrar,
  DOMConfigurator,
  validatorsSetter,
  finalizer
});

export default constructor;

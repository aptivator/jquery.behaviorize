const validators = {
  deps: {
    validator(p) {
      let {$deps, validationConfigs} = p;
      let {error} = validationConfigs.classes.element;
      return !$deps.hasClass(error);
    },
    
    notifier(p) {
      return `${p.name} depends on ${p.depNames.join(', ')}`;
    }
  }
};

export default validators;

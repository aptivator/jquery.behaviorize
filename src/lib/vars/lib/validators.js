const validators = {
  deps: {
    validator(p) {
      let {$deps, validifyConfigs} = p;
      let {error} = validifyConfigs.classes.element;
      return !$deps.hasClass(error);
    },
    
    notifier(p) {
      return `${p.name} depends on ${p.depNames.join(', ')}`;
    }
  }
};

export default validators;

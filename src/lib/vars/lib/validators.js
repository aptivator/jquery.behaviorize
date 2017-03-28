const validators = {
  deps: {
    validator(p) {
      let {$deps, validationConfigs} = p;
      let {error} = validationConfigs.classes.element;
      return !$deps.hasClass(error);
    },
    message(p) {
      return `${p.name} depends on ${p.dependencyNames.join(', ')}`;
    }
  }
};

export default validators;
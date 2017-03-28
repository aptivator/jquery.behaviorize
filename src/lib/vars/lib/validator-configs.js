import _ from 'lodash';

let baseDefaults = {'default': '', error: ''};

const validatorConfigs = {
  classes: {
    mainContainer: _.clone(baseDefaults),
    elementContainer: _.clone(baseDefaults),
    element: _.clone(baseDefaults),
    errorContainer: _.clone(baseDefaults),
    errorMessage: _.clone(baseDefaults)
  },
  
  selectors: {
    mainContainer: '',
    elementContainer: '',
    errorSibling: ''
  },
  
  validateOnStart: true,
  
  validateAll: true
};

export default validatorConfigs;

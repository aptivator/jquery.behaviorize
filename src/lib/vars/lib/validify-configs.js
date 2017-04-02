import _ from 'lodash';

let classDefaults = {'default': '', error: ''};

const validatorConfigs = {
  classes: {
    mainContainer: _.clone(classDefaults),
    elementContainer: _.clone(classDefaults),
    element: _.clone(classDefaults),
    errorContainer: _.clone(classDefaults),
    errorMessage: _.clone(classDefaults)
  },
  
  selectors: {
    mainContainer$: '',
    elementContainer$: '',
    errorSibling$: ''
  },
  
  validateOnStart: true,
  
  validateAll: true
};

export default validatorConfigs;

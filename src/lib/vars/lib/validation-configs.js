import _ from 'lodash';

let classDefaults = {'default': '', error: ''};

const validationConfigs = {
  classes: {
    mainContainer: _.cloneDeep(classDefaults),
    elementContainer: _.cloneDeep(classDefaults),
    element: _.cloneDeep(classDefaults),
    errorContainer: _.cloneDeep(classDefaults),
    errorMessage: _.cloneDeep(classDefaults)
  },
  
  selectors: {
    mainContainer: '',
    elementContainer: '',
    errorSibling: ''
  },
  
  validateOnStart: true,
  
  validateAll: true
};

export default validationConfigs;

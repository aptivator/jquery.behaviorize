let {expect} = require('chai');
let dom = require('../lib/dom');
let html = '';
let win;
let $;

describe('configurations', function() {
  this.timeout(10000);

  before(async () => [win, $] = await dom(html));
  
  after(() => win.close());
  
  describe('prefix', () => {
    it('changes prefix', () => {
      let configs = $.behaviorize({prefix: '_'});
      expect(configs.prefix).to.eql({prefix: '_'});
    });
  });
  
  describe('actions', () => {
    it('sets actions', () => {
      let configs = $.behaviorize({
        actions: {
          action() {}
        }
      });
      
      let action = configs.actions.action.toString('utf-8');
      expect(action).to.equal('action() {}');
    });
    
    it('augments actions', () => {
      let configs = $.behaviorize({
        actions: {
          action2() {}
        }
      });
      
      let actionNames = Object.keys(configs.actions);
      expect(actionNames).to.eql(['action', 'action2']);
    });
  });
  
  
  describe('validators', () => {
    it('sets validators', () => {
      let configs = $.behaviorize({
        validators: {
          number() {}
        }
      });
      
      let validator = configs.validators.number.toString('utf-8');
      expect(validator).to.equal('number() {}');
    });
    
    it('augments validators', () => {
      let configs = $.behaviorize();
      let validatorNames = Object.keys(configs.validators);
      expect(validatorNames).to.eql(['deps', 'number']);
    });
  });
  
  describe('validation', () => {
    it('sets validation classes', () => {
      let base = {default: 'class', error: 'class-err'};
      let classes = {
        mainContainer: base,
        elementContainer: base,
        element: base,
        errorContainer: base,
        errorMessage: base
      };
      
      let configs = $.behaviorize({validationConfigs: {classes}});
      expect(configs.validationConfigs.classes).to.eql(classes);
    });
    
    it('sets selectors', () => {
      let selectors = {
        mainContainer: 'selector1',
        elementContainer: 'selector2',
        errorSibling: 'selector3'
      };
      
      let configs = $.behaviorize({validationConfigs: {selectors}});
      expect(configs.validationConfigs.selectors).to.eql(selectors);
    });
    
    it('sets flags', () => {
      let validateOnStart = false;
      let validateAll = false;
      
      let configs = $.behaviorize({validationConfigs: {
        validateOnStart,
        validateAll
      }});
      
      expect(configs.validationConfigs.validateOnStart).to.be.false;
      expect(configs.validationConfigs.validateAll).to.be.false;
    });
  });
});

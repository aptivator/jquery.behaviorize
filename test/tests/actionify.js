let {expect} = require('chai');
let _ = require('lodash');
let sinon = require('sinon');
let dom = require('../lib/dom');
let win;
let $;

describe('actions', function() {
  this.timeout(10000);

  before(done => {

  });
  
  after(() => win.close());
  
  describe('$.behaviorize', () => {
    it('adds configuration without erroring out', () => {
      let configs = {
        prefix: '_',
        actions: {
          invoke(p) {}
        }
      };
      
      expect(() => $.behaviorize(configs)).to.not.throw(Error);
    });
    
    it('returns current configuration', () => {
      let obj = $.behaviorize();
      let subset = _.pick(obj, ['actions', 'prefix']);
      let prefix = _.pick(subset, ['prefix']);
      let stringified = subset.actions.invoke.toString().replace(/\s+/g, '');
      
      expect(stringified).to.equal('invoke(p){}');
      expect(prefix).to.eql({
        prefix: {prefix: '_'}
      });
    });
  });
  
  describe('$.fn.behaviorize', () => {
    it('returns a set of all marked elements', () => {
      //let $set = $('body').behaviorize();
      //expect($set.length).to.equal(1);
    });
    
    it('applies one-time initial action/transformation to an element', () => {
      $.behaviorize({
        actions: {
          invoke(p) {
            let {$el, configs} = p;
            let {['class name']: klass} = configs;
            $el.addClass(klass);
          }
        }
      });
      
      $('body').behaviorize();
      
      expect($('input:first').hasClass('red')).to.be.true;
    });
    
    it('assigns an event handler to be invoked multiple times', done => {
      $('input:last').attr('_a-triggerer', '');

      $('body').behaviorize({
        actions: {
          triggerer: {
            action(p) {},
            events: ['keyup', 'click']
          }
        }        
      });
      
      let configs = $.behaviorize();
      let triggererSpy = sinon.spy(configs.actions.triggerer, 'action');
      
      $('input:last').trigger('keyup').trigger('keyup').trigger('click');
      setTimeout(() => {
        expect(triggererSpy.callCount).to.equal(3);
        done();
      });
    });
  });
});

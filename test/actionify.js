let {expect} = require('chai');
let _ = require('lodash');
let sinon = require('sinon');
let jsdom = require('jsdom');
let path = require('path');
let jqueryPath = path.resolve(__dirname, '../node_modules/jquery/dist/jquery.js');
let extrasPath = path.resolve(__dirname, '../node_modules/jquery.extras/dist/extras.js');
let lodashPath = path.resolve(__dirname, '../node_modules/lodash/lodash.js');
let behaviorizePath = path.resolve(__dirname, '../dist/behaviorize.js');

let $;

describe('jquery.behaviorize :: actionify', function() {
  this.timeout(10000);

  before(done => {
    jsdom.env(
      `<body>
        <input type = "text" _a-invoke = "{class name: red}" />
        <input type = "text" _v-deps />
        <input type = "text" />
      </body>`,
      [lodashPath, jqueryPath, extrasPath, behaviorizePath],
      (err, window) => {
        if(err) {
          console.error(err);
        }
        
        ({$} = window);
        
        done();
      }
    );
  });
  
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
      let $set = $('body').behaviorize();
      expect($set.length).to.equal(2);
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
      
      let configs = $.behaviorize({
        actions: {
          triggerer: {
            action(p) {},
            events: ['keyup', 'click']
          }
        }
      });
      
      let triggererSpy = sinon.spy(configs.actions.triggerer, 'action');
      
      $('body').behaviorize();
      $('input:last').trigger('keyup');
      $('input:last').trigger('keyup');
      $('input:last').trigger('click');
      setTimeout(() => {
        expect(triggererSpy.callCount).to.equal(3);
        done();
      });
    });
  });
});

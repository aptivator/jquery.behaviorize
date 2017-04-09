let {expect} = require('chai');
let sinon = require('sinon');
let dom = require('../lib/dom');
let html = `
  <input type = "text" a-class = "red" />
  <input type = "text" a-transform = "{test: 22}" />
  <input type = "text" a-clicker />`;
let win;
let $;

describe('actions', function() {
  this.timeout(10000);

  before(async () => [win, $] = await dom(html));
  
  after(() => win.close());
  
  describe('transformations', () => {
    before(() => {
      $.behaviorize({
        actions: {
          class(p) {
            let {$el, configs} = p;
            $el.addClass(configs);
          }
        }
      });
    });
    
    it('applies a transformation', () => {
      $('body input:first').behaviorize();
      expect($('input:first').hasClass('red')).to.be.true;
    });
    
    it('passes $el and configs to action function', () => {
      $.behaviorize({
        actions: {
          transform(p) {
            let {$el, configs} = p;
            expect($el).to.be.ok;
            expect(configs).to.eql({test: 22});
          }
        }
      });
      
      $('input:eq(1)').behaviorize();
    });
  });
  
  describe('actions', () => {
    before(() => {
      win.console = console;
      $.behaviorize({
        actions: {
          clicker: {
            action(p) {},
            events: 'click keyup'
          }
        }
      });
    });
    
    it('invokes an action on certain events', () => {
      let configs = $.behaviorize();
      let clickerSpy = sinon.spy(configs.actions.clicker, 'action');
      $('input:last').behaviorize();
      $('input:last').trigger('click').trigger('click').trigger('keyup').trigger('keydown');
      expect(clickerSpy.callCount).to.equal(3);
    });
  });
});

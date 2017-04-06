let {expect} = require('chai');
let jsdom = require('jsdom');
let path = require('path');

let jqueryPath = path.resolve(__dirname, '../node_modules/jquery/dist/jquery.js');
let extrasPath = path.resolve(__dirname, '../node_modules/jquery.extras/dist/extras.js');
let lodashPath = path.resolve(__dirname, '../node_modules/lodash/lodash.js');
let behaviorizePath = path.resolve(__dirname, '../dist/behaviorize.js');
let $;

describe('jquery.behaviorize :: validify', function() {
  this.timeout(10000);
  
  before(done => {
    jsdom.env(
      `<body>
        <form>
          <label>
            <input type = "text" name = "age" v-number />
          </label>
          <label>
            <input type = "text" name = "name" v-deps = '{selector: "input:first", disable: true}' />
          </label>
        </form>
      </body>`,
      [lodashPath, jqueryPath, extrasPath, behaviorizePath],
      (err, window) => {
        if(err) {
          console.error(err);
        }
        
        window.console = console;
        window.onerror = e => console.log(e);
        ({$} = window);
        
        $.behaviorize({
          prefix: '',
          validifyConfigs: {
            classes: {
              mainContainer: {
                default: '',
                error: 'main-err'
              },
              elementContainer: {
                default: '',
                error: 'el-container-err'
              },
              element: {
                default: '',
                error: 'el-err'
              },
              errorContainer: {
                default: '',
                error: 'err-container-err'
              },
              errorMessage: {
                default: '',
                error: 'err-message-err'
              }
            },
            
            selectors: {
              mainContainer: 'form',
              elementContainer: 'label',
              errorSibling: 'label'
            },
            
            validateOnStart: true,
            
            validateAll: true
          },
          
          validators: {
            number: {
              validator(p) {
                let value  = p.$el.val();
                return /\d+/.test(value);
              },
              
              notifier(p) {
                let {name} = p;
                return `${name} should be numeric`;
              }
            }
          }
        });

        $('body').behaviorize();
        $('body').behaviorize();
        setTimeout(() => {
          done();
        }, 100);
      }
    );
  });
  
  describe('validify()', () => {
    it('assigns unique ids to marked elements', () => {
      expect($('input:first').id()).to.match(/^jquery-extras-id/);
      expect($('input:eq(1)').id()).to.match(/^jquery-extras-id/);
    });
    
    it('auto assigns classes to marked elements', () => {
      let ids = $('input').attr('id');
      ids.forEach(id => {
        expect($(`#${id}`).hasClass(`v-${id}`)).to.be.true;
      });
    });
    
    it('auto assigns classes to element container', () => {
      let id = $('input:first').id();
      expect($('label:first').hasClass(`v-${id}`)).to.be.true;
    });
    
    it('auto assigns classes to error container', () => {
      let $input = $('input:first');
      let id = $input.id();
      expect($('label + div').hasClass(`v-${id}`)).to.be.true;
    });
    
    it('auto assigns specific validator error class to element', () => {
      expect($('input:first').hasClass('v-error-number')).to.be.true;
      expect($('input:last').hasClass('v-error-deps')).to.be.true;
      expect($('label:first + div').hasClass('v-error-number')).to.be.true;
      expect($('label:last + div').hasClass('v-error-deps')).to.be.true;
    });
    
    it('removes error classes when validation passes', done => {
      $('input:first').val('1234').trigger('keyup');
      setTimeout(() => {
        expect($('input').hasClass('el-err')).to.be.false;
        done();
      }, 20);
    });
  });
});


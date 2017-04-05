let {expect} = require('chai');
let _ = require('lodash');
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
            <input type = "text" name = "age" $v-number />
          </label>
        </form>
      </body>`,
      [lodashPath, jqueryPath, extrasPath, behaviorizePath],
      (err, window) => {
        if(err) {
          console.error(err);
        }
        
        window.console.log = console.log.bind(console);
        
        ({$} = window);
        
        $.behaviorize({
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
            
            validateOnStart: false,
            
            validateAll: true
          },
          
          validators: {
            number: {
              validator(p) {
                let value  = p.$el.val();
                console.log('validator triggered', value, /\d+/.test(value));
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
        
        done();
      }
    );
  });
  
  describe('validify()', () => {
    it('validates', () => {
      expect(1).to.be.ok;
    });
  });
});

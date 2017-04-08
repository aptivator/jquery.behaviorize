let jsdom = require('jsdom');
let path = require('path');
let basePath = path.resolve(__dirname, '../../node_modules/');
let jquery = path.resolve(basePath, 'jquery/dist/jquery.js');
let extras = path.resolve(basePath, 'jquery.extras/dist/extras.js');
let lodash = path.resolve(basePath, 'lodash/lodash.js');
let behaviorize = path.resolve(__dirname, '../../dist/behaviorize.js');
let deps = [jquery, extras, lodash, behaviorize];

module.exports = async html => {
  return new Promise((resolve, reject) => {
    jsdom.env(html, deps, (err, window) => {
      if(err) {
        reject(err);
      }
      resolve([window, window.$]);
    });
  });
};

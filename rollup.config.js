import buble    from 'rollup-plugin-buble';
let packageJson = require('./package.json');
let {'jsnext:main': jsnext, main} = packageJson;

export default {
  moduleName: 'jquery.behaviorize',
  entry: 'src/behaviorize.js',
  targets: [{
    format: 'umd',
    dest: main
  }, {
    format: 'es',
    dest: jsnext
  }],
  globals: {
    jquery: '$',
    lodash: '_'
  },
  external: ['jquery', 'lodash', 'jquery.extras'],
  plugins: [
    buble()
  ]
};

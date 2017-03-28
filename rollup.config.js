import buble    from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import resolve  from 'rollup-plugin-node-resolve';

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
  external: ['jquery', 'lodash'],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    buble({
      transforms: {
        dangerousForOf: true
      }
    })
  ]
};

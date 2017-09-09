import rollupBabel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';


const input = 'src/qPool.js';

const name = 'queue-pool';

const minify = process.env.MINIFY;
const format = process.env.FORMAT;

const es = format === 'es';
const umd = format === 'umd';
const cjs = format === 'cjs';

let output;

const fnPath = 'dist/qPool';

if (es) {
  output = [{
    file: `${fnPath}.es.js`,
    format: 'es',
  }];
} else if (umd) {
  if (minify) {
    output = [{
      file: `${fnPath}.umd.min.js`,
      format: 'umd',
      sourcemap: true,
    }];
  } else {
    output = [{
      file: `${fnPath}.umd.js`,
      format: 'umd',
      sourcemap: true,
    }];
  }
} else if (cjs) {
  output = [{
    file: `${fnPath}.cjs.js`,
    format: 'cjs',
  }];
} else if (format) {
  throw new Error(`invalid format specified: "${format}".`);
} else {
  throw new Error('no format specified. --environment FORMAT:xxx');
}

export default {
  input,
  output,
  name,
  plugins: [
    umd ? replace({ 'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development') }) : null,
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    json(),
    rollupBabel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['env', {
          modules: false,
        }],
        ['stage-2'],
      ],
      plugins: ['external-helpers'],
    }),
    minify ? uglify() : null,
  ].filter(Boolean),
};

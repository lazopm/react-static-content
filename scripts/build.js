const fs = require('fs')
const { rollup } = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const { minify } = require('uglify-es');

rollup({
    input: 'src/index.js',
    external: [
        'react',
        'react-dom',
        'prop-types'
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs(),
        //uglify({}, minify),
    ],
}).then(bundle => bundle.write({
    format: 'cjs',
    file: 'build/bundle.js'
}))
.catch(console.log);

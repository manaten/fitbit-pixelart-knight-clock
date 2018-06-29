import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/app/index.js',
  external: [
    'clock',
    'document',
    'user-settings'
  ],
  output: {
    name: 'howLongUntilLunch',
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [
        '@babel/react',
        ['@babel/env', {
           modules: false,
           targets: { node: '6' }
        }]
      ]
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  ]
};

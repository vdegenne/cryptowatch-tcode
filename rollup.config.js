import nodeResolve from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/content.js',
  output: { file: 'content.js', format: 'iife' },
  plugins: [cjs(), nodeResolve()]
}
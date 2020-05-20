import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'esm/index.mjs',
  output: {
    format: 'es',
    file: 'bundle.mjs',
  },
  plugins: [
    filesize({ showBrotliSize: true }),
    babel({ presets: ['@babel/preset-env'] }),
    terser({
      toplevel: true,
      output: { semicolons: false },
      warnings: true,
      compress: { passes: 2 },
    }),
  ],
}

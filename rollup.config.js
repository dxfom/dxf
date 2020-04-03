import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'esm/index.mjs',
    output: {
      format: 'es',
      file: 'index.mjs',
    },
    plugins: [
      filesize({ showBrotliSize: true }),
      babel({
        presets: ['@babel/preset-env'],
      }),
      terser({
        toplevel: true,
        output: { semicolons: false },
        warnings: true,
        compress: { passes: 2 },
      }),
    ],
  },
  {
    input: 'esm/index.d.ts',
    output: {
      format: 'es',
      file: 'index.d.ts',
    },
    plugins: [
      dts(),
    ],
  },
]

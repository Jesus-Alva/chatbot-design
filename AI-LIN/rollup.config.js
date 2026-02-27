import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    postcss({
      plugins: [tailwindcss('./tailwind.config.js'), autoprefixer],
      extract: 'dist/styles.css',
      minimize: true,
    }),
  ],
  external: ['react', 'react-dom'],
};
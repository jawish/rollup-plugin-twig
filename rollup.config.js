import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  output: [
    { file: './dist/rollup-plugin-twig.cjs.js', format: 'cjs', sourcemap: true },
    { file: './dist/rollup-plugin-twig.es.js', format: 'es', sourcemap: true }
  ],
  plugins: [
    filesize()
  ],
  external: Object.keys(require('./package.json').dependencies),
}

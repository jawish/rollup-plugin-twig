const assert = require('assert');
const { rollup } = require('rollup');
const Twig = require('twig');

const twigPlugin = require('../');

process.chdir(__dirname);

before(() => {
  global.Twig = Twig;
});

describe('rollup-plugin-twig', () => {
  it('compiles twig template', () => {
    return rollup({
      input: 'fixtures/basic/basic.js',
      plugins: [twigPlugin()],
    })
      .then(bundle => bundle.generate({ format: 'cjs' }))
      .then(generated => {
        const fn = new Function('assert', generated.output[0].code); // eslint-disable-line
        fn(assert);
      });
  });

  it('compiles twig template without minification', () => {
    return rollup({
      input: 'fixtures/unminified/unminified.js',
      plugins: [
        twigPlugin({
          minify: false,
        }),
      ],
    })
      .then(bundle => bundle.generate({ format: 'cjs' }))
      .then(generated => {
        const fn = new Function('assert', generated.output[0].code); // eslint-disable-line
        fn(assert);
      });
  });

  it('compiles twig template with data', () => {
    return rollup({
      input: 'fixtures/data/data.js',
      plugins: [twigPlugin()],
    })
      .then(bundle => bundle.generate({ format: 'cjs' }))
      .then(generated => {
        const fn = new Function('assert', generated.output[0].code); // eslint-disable-line
        fn(assert);
      });
  });
});

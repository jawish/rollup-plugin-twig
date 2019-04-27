import { createFilter } from 'rollup-pluginutils';
import { twig } from 'twig';
import { minify } from 'html-minifier';

const extension = /\.twig$/;

const defaults = {
  minify: true,
  minifyOptions: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    decodeEntities: true,
    html5: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  },
};

export default function Twig(options) {
  const opts = Object.assign({}, defaults, options);

  const filter = createFilter(opts.include, opts.exclude);

  function compile(html) {
    let minified = html;

    if (opts.minify === true) {
      minified = minify(html, opts.minifyOptions);
    }

    const template = twig({ data: minified });
    const tokens = JSON.stringify(template.tokens);

    return `Twig.twig({
      data: ${tokens},
      precompiled: true,
      allowInlineIncludes: true
    })`;
  }

  return {
    name: 'rollup-plugin-twig',
    transform: (code, id) => {
      if (!extension.test(id) || !filter(id)) {
        return null;
      }

      return {
        code: `export default ${compile(code)};`,
        map: { mappings: '' },
      };
    },
  };
}

# rollup-plugin-twig

[Rollup](https://github.com/rollup/rollup) plugin that pre-compiles [Twig.js](https://github.com/twigjs/twig.js) templates.

## Installation

NPM:
```sh
npm install --save-dev rollup-plugin-twig
```

Yarn:
```sh
yarn add --dev rollup-plugin-twig
```

## Usage

Update `rollup.config.js`:
```js
import { rollup } from 'rollup';
import strip from 'rollup-plugin-twig';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'dist/my-lib.cjs.js'
    }
  ],
  plugins: [
    twig()
  ]
};
```

Create your Twig template files `*.twig`. e.g.:

```html
<div>{{ name }}</div>
```

Import your Twig templates where needed. e.g:

```js
import template from './template.twig'

const data = { name: 'John Doe' }
console.log(template.render(data)) // <div>John Doe</div>
```

## Options

Plugin options you can pass :

* `include`
Minimatch or array of minimatch with files that should be included by default.

* `exclude`
Minimatch or array of minimatch with files that should be excluded by default.
* `minify`
Minify the template using `html-minifier`. Default: `true`.

* `minifyOptions`
Options to configure `html-minifier`.
Default options:
```js
{
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  decodeEntities: true,
  html5: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
}
```

## License

MIT [License](LICENSE.md)

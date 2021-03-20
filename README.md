# esbuild-plugin-vue2-template-compiler

esbuild plugin to compile vuejs 2.0 template file, base on [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler).

vue-template-compiler is a low level package to dual with vue template. It used in vue-loader. With the compiler, it easy to transform template code to JavaScript render/staticRenderFns functions.

## Base usage

Build script file, `build.js`:

```js
const esbuild = require('esbuild');
const { Vue2TemplateCompilerPlugin } = require('../dist');

esbuild
  .build({
    entryPoints: ['src/index.js'],
    minify: true,
    bundle: true,
    outfile: 'dist/index.js',
    plugins: [Vue2TemplateCompilerPlugin()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  })
  .catch(() => process.exit(1));
```

In vue component file, `title.js`:

```js
import Vue from 'vue';
import TPL from './title.template.html'; // template file

export default Vue.extend({
  ...TPL,
});
```

The template file, `title.template.html`:

```html
<h1><slot /></h1>
```

## Limits

- Not support scoped styles
- manually import the template file

## License

[MIT](LICENSE)

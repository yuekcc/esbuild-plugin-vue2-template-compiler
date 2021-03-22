const esbuild = require('esbuild');
const { vue2TemplateCompilerPlugin } = require('../dist');

esbuild
  .build({
    entryPoints: ['src/index.js'],
    minify: false,
    bundle: true,
    outfile: 'dist/index.js',
    plugins: [vue2TemplateCompilerPlugin()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    external: ['vue'],
  })
  .catch(() => process.exit(1));

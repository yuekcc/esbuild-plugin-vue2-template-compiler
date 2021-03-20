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

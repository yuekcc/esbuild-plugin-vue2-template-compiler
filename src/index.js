import vueTemplateCompiler from 'vue-template-compiler';
import fs from 'fs';

function toFunction(body) {
  return `function() {${body}}`;
}

function compile(code) {
  try {
    const { render, staticRenderFns, errors } = vueTemplateCompiler.compile(code);

    const contents = `module.exports = {
    render: ${toFunction(render)},
    staticRenderFns: [
        ${staticRenderFns.map(toFunction).join(',\n')}
    ]
}`;
    return { contents, errors };
  } catch (err) {
    return { errors: [err.message] };
  }
}

export function Vue2TemplateCompilerPlugin() {
  return {
    name: 'vue2-template-compiler',
    setup(build) {
      build.onLoad({ filter: /\.template.html$/ }, async (args) => {
        const source = await fs.promises.readFile(args.path, 'utf-8');
        return compile(source);
      });
    },
  };
}

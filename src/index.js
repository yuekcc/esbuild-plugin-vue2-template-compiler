import vueTemplateCompiler from 'vue-template-compiler';
import transformToEs2015 from 'vue-template-es2015-compiler';
import fs from 'fs';

function toFunction(body) {
  return `function() {${body}}`;
}

function compile(source) {
  try {
    const { render, staticRenderFns, errors, tips } = vueTemplateCompiler.compile(source);
    if (Array.isArray(errors) && errors.length > 0) {
      return { contents: '', errors };
    }

    if (Array.isArray(tips) && tips.length > 0) {
      tips.forEach((tip) => {
        console.log('[vue-template-compiler] tips:', tip);
      });
    }

    const code = `module.exports = {
    render: ${toFunction(render)},
    staticRenderFns: [
        ${staticRenderFns.map(toFunction).join(',\n')}
    ]
}`;
    const contents = transformToEs2015(code).replace(`module.exports = {`, `export default {`);

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

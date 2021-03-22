import { CompilerOptions } from 'vue-template-compiler';
import { Plugin } from 'esbuild';
export interface PluginOptions {
    extension: string;
    compilerOptions?: CompilerOptions;
}
export declare function vue2TemplateCompilerPlugin(options?: PluginOptions): Plugin;

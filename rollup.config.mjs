/*
 * @Author: wang shuo
 * @Date: 2023-05-05 23:46:37
 * @LastEditors: W·S
 * @LastEditTime: 2023-07-14 17:47:59
 * @Description: Description
 */
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/es',
      jsx: 'preserve'
    }),
    babel({
      plugins: ['lodash'],
      presets: [['@babel/env', { modules: false, targets: { node: 6 } }]],
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts']
    }),
    terser()
  ],
  input: Object.fromEntries([
    ...globSync('src/**/*.ts').map((file) => [
      // 这里将删除 `src/` 以及每个文件的扩展名。
      // 因此，例如 src/nested/foo.js 会变成 nested/foo
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length)
      ),
      // 这里可以将相对路径扩展为绝对路径，例如
      // src/nested/foo 会变成 /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url))
    ])
  ]),
  output: [
    {
      dir: 'dist',
      format: 'esm',
      chunkFileNames: 'utils/[name]-[hash].js',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env']
        })
      ]
    }
  ],
  // 指出哪些模块需要被视为外部引入
  external: []
};

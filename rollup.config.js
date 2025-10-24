import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

// 添加 dotenv 支持
import dotenv from 'dotenv';
// 加载 .env 文件中的环境变量
dotenv.config();

// 获取环境变量 - 确保 process 在 Rollup 配置中可用
import process from 'node:process';
// 获取环境变量
const isProduction = process.env.NODE_ENV === 'production';
const BUILD_FORMAT =
  (process.env.BUILD_FORMAT || 'esm') === 'cjs' ? 'cjs' : 'esm';

// 排除的外部依赖
const external = ['lodash', 'dayjs'];

// 基础插件配置
const basePlugins = [
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs({
    sourceMap: !isProduction
  }),
  typescript({
    tsconfig: './tsconfig.json',
    declarationDir: `dist/${BUILD_FORMAT}/types`, // 添加这一行
    sourceMap: !isProduction,
    jsx: 'preserve'
  }),
  babel({
    plugins: ['lodash'],
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          targets: {
            node: '18',
            browsers: ['> 1%', 'last 2 versions', 'not dead']
          }
        }
      ]
    ],
    babelHelpers: 'bundled',
    extensions: ['.js', '.ts', '.tsx'],
    sourceMaps: !isProduction
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    )
  })
];

// 生产环境额外插件
const prodPlugins = isProduction
  ? [
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  : [];

// 输入文件配置
const input = Object.fromEntries(
  globSync('src/**/*.ts').map((file) => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

/**
 * @type {import('rollup').RollupOptions}
 */
export default defineConfig({
  // 启用缓存提高构建速度
  cache: true,
  // 输入配置
  input,
  // 外部依赖配置
  external,
  // 插件配置
  plugins: [...basePlugins, ...prodPlugins],
  // 输出配置 - 同时支持 ES Module 和 CommonJS 格式
  output: [
    // ES Module/CommonJS 格式输出
    {
      dir: `dist/${BUILD_FORMAT}`,
      format: BUILD_FORMAT,
      sourcemap: !isProduction,
      chunkFileNames: 'utils/[name]-[hash].js',
      entryFileNames: '[name].js',
      preserveModules: true,
      preserveModulesRoot: 'src',
      exports: BUILD_FORMAT === 'cjs' ? 'named' : undefined,
      plugins:
        BUILD_FORMAT === 'cjs'
          ? []
          : [
              getBabelOutputPlugin({
                presets: ['@babel/preset-env']
              })
            ]
    }
  ],
  // 优化配置
  treeshake: {
    preset: 'smallest',
    manualPureFunctions: ['lodash']
  }
});

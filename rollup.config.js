import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';

const extensions = ['.js', '.ts', '.tsx', '.mjs', '.json', '.node', '.jsx'];
process.env.NODE_ENV = 'production';

const dependencies = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.peerDependencies))
  .filter(dep => ![].includes(dep));

function isExternal(id) {
  const ret = dependencies.includes(id);
  if (!ret) {
    for (const dep of dependencies) {
      if (id.startsWith(dep)) return true;
    }
  }
  return ret;
}

const plugins = [];
const presets = [
  [
    '@anansi/babel-preset',
    {
      useBuiltIns: false,
    },
  ],
];

const configs = [];
if (process.env.BROWSERSLIST_ENV !== 'node12') {

  // browser-friendly UMD build
  configs.push({
    input: 'src/index.tsx',
    external: isExternal,
    output: [{ file: pkg.unpkg, format: 'umd', name: 'hookHoc' }],
    plugins: [
      babel({
        exclude: ['node_modules/**', '**/__tests__/**'],
        extensions,
        runtimeHelpers: true,
        plugins,
        presets,
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      resolve({ extensions }),
      commonjs({ extensions }),
      json(),
      terser({}),
      filesize(),
    ],
  })
} else {
  // node-friendly commonjs build
  configs.push({
    input: 'src/index.tsx',
    external: isExternal,
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins: [
      babel({
        exclude: ['node_modules/**', '**/__tests__/**', '**/*.d.ts'],
        extensions,
        runtimeHelpers: true,
        plugins,
        presets,
      }),
      resolve({ extensions }),
      commonjs({ extensions }),
    ],
  });
}
export default configs;

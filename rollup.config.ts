import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { resolve as resolveDir } from 'path';
import cleaner from 'rollup-plugin-cleaner';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: './dist/index.js',
			format: 'cjs',
			exports: 'named',
			sourcemap: true
		},
		{
			file: './dist/index.es.mjs',
			format: 'es',
			exports: 'named',
			sourcemap: true
		},
		{
			file: './dist/index.umd.js',
			format: 'umd',
			name: '--name-umd--',
			sourcemap: true
		}
	],
	plugins: [
		cleaner({
			targets: ['./dist/']
		}),
		commonjs(),
		json(),
		nodeResolve({ preferBuiltins: true }),
		nodePolyfills(),
		typescript({ tsconfig: resolveDir(__dirname, 'src', 'tsconfig.json') }),
		terser({
			ecma: 2019,
			// This will ensure that whenever Rollup is in watch (dev) mode, console logs will not be removed
			// eslint-disable-next-line @typescript-eslint/naming-convention
			compress: { drop_console: !Reflect.has(process.env, 'ROLLUP_WATCH') }
		})
	]
};

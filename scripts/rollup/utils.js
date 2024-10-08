import cjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import path from 'path';
import ts from 'rollup-plugin-typescript2';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}
export function getPackageJSON(pkgName) {
	const pathStr = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(pathStr, { encoding: 'utf-8' });
	return JSON.parse(str);
}
export function getBaseRollupPlugins({ typescript = {} } = { typescript: {} }) {
	return [cjs(), ts(typescript)];
}

import chalk from 'chalk';
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

export const addDevScriptToPackageJson = (mainDir) => {
	console.log(`${chalk.cyan('>> Adding [dev] script to package.json...')}`);
	const packageJson = JSON.parse(
		readFileSync(path.join(process.cwd(), mainDir, 'package.json')),
	);
	packageJson.scripts['dev'] = 'nodemon server.js';
	writeFileSync(
		path.join(process.cwd(), mainDir, 'package.json'),
		JSON.stringify(packageJson, null, 2),
	);
	console.log(`${chalk.green('>+ [dev] script was added 🎉 ')}`);
};

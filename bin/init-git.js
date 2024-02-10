import chalk from 'chalk';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

export const InitGit = (mainDir) => {
	console.log(chalk.cyan('>> Initializing git...'));
	execSync(`cd ${path.join(process.cwd(), mainDir)} && git init`);
	console.log(chalk.green('>+ Initialized ✅'));
	console.log(chalk.cyan('>> Creating .gitignore ...'));
	writeFileSync(`${path.join(process.cwd(), mainDir, '.gitignore')}`, 'node_modules\n.env\n', {
		encoding: 'utf-8',
	});
	console.log(chalk.green('>+ created .gitignore 🎉'));
};

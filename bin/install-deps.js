import chalk from 'chalk';
import { execSync } from 'child_process';

export function installDeps(os, packages) {
    for (let pkg of packages) {
		console.log(chalk.cyan(`>> Installing [${pkg}] ...`));
		if (os != 'win32') execSync(`sudo npm i ${pkg}`);
		else execSync(`npm i ${pkg}`);
		console.log(chalk.green(`>+ INSTALLED PKG [${pkg}]`));
	}
}

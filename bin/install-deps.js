import chalk from 'chalk';
import { execSync } from 'child_process';

export function installDeps(os, packages) {
    for (let pkg of packages) {
		console.log(chalk.cyan(`>> Installing [${pkg}] ...`));
		execSync(`npm i ${pkg}`);
		console.log(chalk.green(`>+ INSTALLED PKG [${pkg}]`));
	}
}

import { writeFileSync, mkdirSync } from 'fs';
import { OOPDirs, functionalDirs } from './configs/dirs.js';
import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';
import { OOPRComponents, functionalRComponents } from './configs/files.js';

/**
 * Create files and directories based on the provided AppType.
 *
 * @param {string} AppType - the type of the application
 * @param {string} mainDir - Where to build the app.
 * @return {void}
 */
export const CreateDirs = (AppType, mainDir) => {
	let folders = [];

	AppType === 'functional' || AppType === 'functional_r'
		? (folders = [...functionalDirs(mainDir)])
		: (folders = [...OOPDirs(mainDir)]);

	for (let dir of folders) {
		mkdirSync(dir, {
			recursive: true,
		});
		console.log(`${chalk.green('DIR CREATED')} ${chalk.magenta(dir)}`);
	}
};

export const CreateFiles = (mainDir, AppType, port) => {
	if (AppType === 'functional_r') {
		let files = functionalRComponents(mainDir, port);
		for (let file of files) {
			writeFileSync(
				`${path.join(file.inside, file.fileName)}`,
				file.content,
				{ encoding: 'utf-8' },
			);
			console.log(
				`${chalk.blueBright('FILE CREATED')} ${chalk.blue(
					file.fileName,
				)}`,
			);
		}
	} else {
		let files = OOPRComponents(mainDir, port);
		for (let file of files) {
			writeFileSync(
				`${path.join(file.inside, file.fileName)}`,
				file.content,
				{ encoding: 'utf-8' },
			);
			console.log(
				`${chalk.blueBright('FILE CREATED')} ${chalk.blue(
					file.fileName,
				)}`,
			);
		}
	}
};

export const CreateServerJs = mainDir =>
	writeFileSync(`${path.join(process.cwd(), mainDir)}/server.js`, '', {
		encoding: 'utf-8',
	});

export const InitPackageJSON = mainDir =>
	execSync(`cd ${path.join(process.cwd(), mainDir)} && npm init -y`);

#!/usr/bin/env node

import * as p from '@clack/prompts';
import chalk, { Chalk } from 'chalk';
import os from 'os';
import { installDeps } from './install-deps.js';
import { InitGit } from './init-git.js';
import { addDevScriptToPackageJson } from './add-dev-command.js';
import {
	CreateDirs,
	CreateFiles,
	CreateServerJs,
	InitPackageJSON,
} from './create-files-dirs.js';
import { startApp } from './start-app.js';

async function main() {
	p.intro(chalk.white(chalk.bgMagenta('hands-free-express')));

	let selectedDependencies = [];
	let appPort;

	const mainDir = await p.text({
		message: '1/4: Where to create your app?',
		defaultValue: '.',
		placeholder: "Default is '.' (current directory)",
	});

	const appType = await p.select({
		message: '2/4: Select your Application Structure',
		options: [
			{
				value: 'functional',
				label: 'Functional (Empty template)',
				hint: 'Only folders and files will be created.',
			},
			{
				value: 'functional_r',
				label: 'Functional (Ready template)',
				hint: 'App Will be Created and developed with functions.',
			},
			{
				value: 'OOP',
				label: 'OOP Based (Empty template)',
				hint: 'Only folders and files will be created.',
			},
			{
				value: 'OOP_r',
				label: 'OOP Based (Ready template)',
				hint: 'App Will be Created and developed with classes.',
			},
		],
	});

	if (appType === 'functional_r' || appType === 'OOP_r') {
		appPort = await p.text({
			message: "Enter your server's port (default: 3000)",
			defaultValue: 3000,
			placeholder: 'Port',
			validate: value => {
				if (isNaN(value)) return 'Port must be a number';
			},
		});
	}

	const initGit = await p.confirm({
		message: '3/4: Do you want to init a git repo?',
		active: 'Yes',
		inactive: 'No',
	});

	const installDependencies = await p.confirm({
		message:
			'4/4: Do you want to choose some essential dependencies and install them?',
		active: 'Yes',
		inactive: 'No',
	});

	if (installDependencies) {
		selectedDependencies = await p.multiselect({
			message:
				'Select Dependencies that you want (select with "space", submit with "enter")',
			options: [
				{
					value: 'mongoose',
					label: 'Mongoose',
					hint: 'ODM for MongoDB.',
				},
				{
					value: 'jsonwebtoken',
					label: 'JsonWebToken',
					hint: 'jwt (A Token based auth strategy)',
				},
				{
					value: 'passport',
					label: 'Passport.js',
					hint: 'Authentication middleware for Node.js',
				},
				{
					value: 'pm2',
					label: 'PM2',
					hint: 'Nodejs Process Manager',
				},
				{
					value: 'morgan',
					label: 'Morgan',
					hint: 'HTTP request logger middleware',
				},
				{
					value: 'winston',
					label: 'Winston',
					hint: 'Logging library for Node.js',
				},
				{
					value: 'cors',
					label: 'Cors',
					hint: 'Cross-Origin Resource Sharing',
				},
				{
					value: 'dotenv',
					label: 'Dotenv',
					hint: 'Environment Variables Parser',
				},
				{
					value: 'http-errors',
					label: 'http-errors',
					hint: 'Http Errors Handler',
				},
				{
					value: 'http-status-codes',
					label: 'http-status-codes',
					hint: 'Http Status Codes',
				},
				{
					value: 'express-validator',
					label: 'Express-Validator',
					hint: 'Express Validator Middleware',
				},
			],
			required: false,
		});
		if (appType === 'OOP_r')
			selectedDependencies.push('auto-bind@4', 'express');
		if (appType === 'functional_r') selectedDependencies.push('express');
	}

	CreateDirs(appType, mainDir);
	InitPackageJSON(mainDir);
	CreateServerJs(mainDir);
	addDevScriptToPackageJson(mainDir);

	if (appType === 'functional_r' || appType === 'OOP_r') CreateFiles(mainDir, appType, appPort);
	if (appType === 'functional_r') selectedDependencies.push('express');
	if (appType === 'OOP_r') selectedDependencies.push('express', 'auto-bind@4');
	if (initGit) InitGit(mainDir);
	if (selectedDependencies.length !== 0)installDeps(os.platform(), selectedDependencies);
	if (appType === 'functional_r' || appType === 'OOP_r') startApp(mainDir);

	p.outro(`HANDS-FREE-EXPRESS | By NimaCodez`);
  	console.log(chalk.bgBlue(`🚀 Please Star the project on Github:
⭐ https://github.com/NimaCodez/hands-free-express ⭐
	`));
}

main();

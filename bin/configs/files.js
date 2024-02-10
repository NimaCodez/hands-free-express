import { OOPRIndexJs, OOPRouter, OOPServerJsCode, appRouterCode, controllerBase, createFunctionReadyServerJs } from './content.js';
import path from 'path';

export const functionalRComponents = (mainDir, port) => {
	return [
		{
			fileName: 'app.routes.js',
			content: appRouterCode,
			inside: path.join(process.cwd(), mainDir, 'src', 'routes')
		},
		{
			fileName: 'server.js',
			content: createFunctionReadyServerJs(port),
			inside: mainDir
		},
	];
};

export const OOPRComponents = (mainDir, port) => {
	return [
		{
			fileName: 'index.js',
			content: OOPRIndexJs,
			inside: path.join(process.cwd(), mainDir, 'app')
		},
		{
			fileName: 'controller.js',
			content: controllerBase,
			inside: path.join(process.cwd(), mainDir, 'app', 'controllers')
		},
		{
			fileName: 'router.js',
			content: OOPRouter,
			inside: path.join(process.cwd(), mainDir, 'app', 'routes')
		},
		{
			fileName: 'server.js',
			content: OOPServerJsCode(port),
			inside: path.join(process.cwd(), mainDir)
		}
	]
}
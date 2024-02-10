import path from 'path';

export const functionalDirs = mainDir => {
	const workingDIR = path.join(process.cwd(), mainDir);
	return [
		path.join(workingDIR, 'src'),
		path.join(workingDIR, 'src', 'controllers'),
		path.join(workingDIR, 'src', 'models'),
		path.join(workingDIR, 'src', 'middlewares'),
		path.join(workingDIR, 'src', 'routes'),
		path.join(workingDIR, 'src', 'services'),
		path.join(workingDIR, 'src', 'utils'),
		path.join(workingDIR, 'src', 'configs'),
	];
};

export const OOPDirs = mainDir => {
	const workingDIR = path.join(process.cwd(), mainDir);
	return [
		path.join(workingDIR, 'app'),
		path.join(workingDIR, 'app', 'controllers'),
		path.join(workingDIR, 'app', 'middlewares'),
		path.join(workingDIR, 'app', 'validations'),
		path.join(workingDIR, 'app', 'routes'),
		path.join(workingDIR, 'app', 'models'),
		path.join(workingDIR, 'app', 'services'),
		path.join(workingDIR, 'app', 'utils'),
		path.join(workingDIR, 'app', 'configs'),
		path.join(workingDIR, 'app', 'connections'),
	];
};

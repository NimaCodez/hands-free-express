import { exec } from 'child_process';
import path from 'path';

export const startApp = mainDir => {
	const child = exec(
		`cd ${path.join(process.cwd(), mainDir)} && npm run dev`,
	);
	child.stdout.on('data', data => process.stdout.write(data));
	child.stderr.on('error', err => process.stderr.write(err));
	child.on('close', code => {
		if (code !== 0)
			return console.log(`child process exited with code ${code}`);
	});
};

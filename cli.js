#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const ceaPath = path.join(__dirname, 'cea.js');

if (!fs.existsSync(ceaPath)) {
  console.error(`Error: could not find required script at ${ceaPath}`);
  process.exit(1);
}

const child = exec(`node ${ceaPath} ${process.argv[2]}`);

child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr.on('error', (err) => {
  process.stdout.write('Error Running cea: ' + err.message);
});

child.on('close', (code) => {
  if (code !== 0) console.log(`child process exited with code ${code}`);
});

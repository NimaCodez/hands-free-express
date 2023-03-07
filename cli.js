#!/usr/bin/env node

const yargs = require('yargs');
const { exec } = require('child_process');

yargs
  .command('-mode [model]', 'Generate a new Express app', (yargs) => {
    yargs.positional('model', {
      type: 'string',
      describe: 'Folder structure model of the new Express app',
    });
  }, (argv) => {
    exec(`node ./cea.js ${argv.model}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        return;
      }
      console.log(stdout);
    });
  })
  .argv;

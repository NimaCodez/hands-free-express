// const { execSync } = require('child_process');
// const workingDIR = execSync('echo %CD%').toString().replace(/\\/g, '/').trim();

const workingDIR = process.cwd();

module.exports = {
  workingDIR
};

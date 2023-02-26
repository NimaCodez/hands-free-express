const path = require('path');
const { workingDIR } = require('./getWorkingDir');

const folders = [
  path.join(workingDIR, 'app'),
  path.join(workingDIR, 'app', 'http', 'controllers', 'admin'),
  path.join(workingDIR, 'app', 'http', 'controllers', 'auth'),
  path.join(workingDIR, 'app', 'http', 'middlewares'),
  path.join(workingDIR, 'app', 'http', 'validations'),
  path.join(workingDIR, 'app', 'http', 'validations', 'auth'),
  path.join(workingDIR, 'app', 'models'),
  path.join(workingDIR, 'app', 'routes'),
  path.join(workingDIR, 'app', 'routes', 'auth'),
  path.join(workingDIR, 'app', 'services'),
  path.join(workingDIR, 'app', 'utils')
];

module.exports = {
    folders
}
const { execSync, createFilesAndFolders, installPackages, files, folders, packages } = require("./index.requirements");
execSync('npm init -y && npm i -D cli-color');
const { clc } = require("./index.requirements");
const { helpMessage } = require("./topLevels");

(function CreateExpressAPP(mode){
    mode = process.argv[3]

    if (!['new', 'help', 'class-based', 'cb', 'no-app'].includes(mode) || mode == 'help') return helpMessage()

    createFilesAndFolders(folders, files, mode);
    installPackages(packages);
    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
})();
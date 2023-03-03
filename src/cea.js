const { execSync, createFilesAndFolders, installPackages, files, folders, packages, folders2, files2 } = require("./index.requirements");
execSync('npm init -y && npm i -D cli-color');
const { clc } = require("./index.requirements");
const { helpMessage } = require("./topLevels");

(function CreateExpressAPP(mode){
    mode = process.argv[3]

    if (!['new-cb', 'help', 'class-based', 'cb', 'no-app'].includes(mode) || mode == 'help') return helpMessage()
    if (mode === 'no-app') createFilesAndFolders(folders2, files2, mode);
    else createFilesAndFolders(folders, files, mode);
    installPackages(packages);
    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
})();
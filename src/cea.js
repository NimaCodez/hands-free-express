const { execSync, createFilesAndFolders, installPackages, files, folders, packages, folders2, files2,helpMessage, initGit } = require("./index.requirements");
execSync('npm init -y && npm i -D cli-color');
const { clc } = require("./index.requirements");

(function CreateExpressAPP(mode){
    mode = process.argv[3]

    if (!['new-cb', 'help', 'class-based', 'cb', 'no-app'].includes(mode) || mode == 'help') return helpMessage()
    if (mode === 'no-app') createFilesAndFolders(folders2, files2, mode);
    else createFilesAndFolders(folders, files, mode);
    installPackages(packages);
    initGit()
    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
})();
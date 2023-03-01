const { execSync, createFilesAndFolders, installPackages, files, folders, packages } = require("./index.requirements");
execSync('npm init -y && npm i -D cli-color');
const { clc } = require("./index.requirements");

(function CreateExpressAPP(mode){
    mode = process.argv[3]

    if (!['new', 'help', 'class-based', 'cb'].includes(mode)) return console.log(clc.redBright('ERROR: Invalid Options.\n'), clc.green('Options: \n >> new (Empty Project)\n >> help \n >> class-based (OOP Based Project)'))

    createFilesAndFolders(folders, files, mode);
    installPackages(packages);
    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
})();
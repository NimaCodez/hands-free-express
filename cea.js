const { createFilesAndFolders, installPackages, files, folders, packages, folders2, files2, helpMessage, initGit, runServer, addDevCommandToPackageJson } = require("./src/index.requirements");
const { clc } = require("./src/index.requirements");
const mode = process.argv.includes('sudo') ? process.argv[3] : process.argv[2];

(function CreateExpressAPP() {
    if (!['new-cb', 'help', 'class-based', 'cb', 'no-app'].includes(mode) || mode == 'help') return helpMessage();
    if (mode === 'no-app') createFilesAndFolders(folders2, files2, mode);
    else createFilesAndFolders(folders, files, mode);

    initGit();
    installPackages();
    addDevCommandToPackageJson();

    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));

    if (mode === 'no-app') runServer()
})();

const { execSync, createFilesAndFolders, installPackages, files, folders, packages } = require("./index.requirements")
execSync('npm init -y && npm i -D cli-color', (err, stdout, stderr) => {
    console.log('\x1b[94m Installing dependencies...')
})
const { clc } = require("./index.requirements")

function createEmptyProject() {
    createFilesAndFolders(folders, files);
    installPackages(packages);
    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
}

function createClassBased() {
    createFilesAndFolders(folders, files);
    installPackages(packages);
    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
}

const createDirectory = (mode) => {
    mode = process.argv[3]

    if (!['new', 'help', 'class-based'].includes(mode)) return console.log(clc.redBright('ERROR: Invalid Options.\n'), clc.green('Options: \n >> new (Empty Project)\n >> help \n >> class-based (OOP Based Project)'))

    if (mode == 'new') createEmptyProject()
    else createClassBased()
}

createDirectory()
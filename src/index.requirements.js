const { files, folders, files2, folders2 } = require("./foldersAndFiles");
const { createFilesAndFolders, installPackages, helpMessage, initGit, runServer, addDevCommandToPackageJson } = require("./topLevels");
const clc = require('cli-color');
const { execSync } = require("child_process");
module.exports = {
    files, folders, files2, folders2, createFilesAndFolders, clc, execSync,helpMessage, initGit, runServer, addDevCommandToPackageJson, installPackages
}
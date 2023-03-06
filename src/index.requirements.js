const { files, folders, files2, folders2 } = require("./foldersAndFiles");
const { packages } = require("./packages");
const { createFilesAndFolders, installPackages, helpMessage, initGit, runServer, addDevCommandToPackageJson } = require("./topLevels");
const clc = require('cli-color');
const { execSync } = require("child_process")
module.exports = {
    files, folders, files2, folders2, packages, createFilesAndFolders, installPackages, clc, execSync,helpMessage, initGit, runServer, addDevCommandToPackageJson
}
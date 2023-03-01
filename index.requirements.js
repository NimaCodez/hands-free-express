const { files, folders } = require("./foldersAndFiles");
const { packages } = require("./packages");
const { createFilesAndFolders, installPackages } = require("./topLevels");
const clc = require('cli-color');
const { execSync } = require("child_process")

module.exports = {
    files, folders, packages, createFilesAndFolders, installPackages, clc, execSync
}
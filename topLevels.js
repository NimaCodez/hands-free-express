const { execSync } = require("child_process");
const clc = require("cli-color");
const { mkdirSync, writeFileSync } = require("fs");

const createFilesAndFolders = (folders, files) => {
    for (let dir of folders) {
        mkdirSync(dir, {
            recursive: true
        })
        console.log(`${clc.green('DIR CREATED')} ${dir}`)
    }

    for (let file of files) {
        writeFileSync(`${file.inside}/${file.name}`, file.content);
        console.log(`${clc.blueBright('FILE CREATED')} ${file.name}`)
    }
}

const installPackages = (packages) => {
    for (let package of packages) {
        console.log(clc.cyan(`>> Installing [${package}] ...`))
        execSync(`npm i ${package}`)
        console.log(clc.green(`>+ INSTALLED PKG [${package}]`))
    }
}

module.exports = {
    createFilesAndFolders,
    installPackages
}
const { execSync } = require("child_process")
const fs = require("fs");

execSync('npm init -y && npm i -D cli-color', (err, stdout, stderr) => {
    console.log('\x1b[94m Installing dependencies...')
    console.log(stdout);
})

const clc = require('cli-color');

const { files } = require("./files.js");
const { folders } = require("./folders.js");
const { packages } = require("./packages.js");

function createEmptyProject() {
    for (let dir of folders) {
        fs.mkdirSync(dir, {
            recursive: true
        })
        console.log(`${clc.green('DIR CREATED')} ${dir}`)
    }

    for (let asset of files) {
        fs.writeFileSync(`${asset.inside}/${asset.name}`, '');
        console.log(`${clc.blueBright('FILE CREATED')} ${asset.name}`)
    }

    console.log(clc.cyan('> Installing -Express + -Mongoose + -dotenv + -Express-Validator ...'))

    execSync('npm i express mongoose dotenv express-validator')

    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
}


function createClassBased() {
    for (let dir of folders) {
        fs.mkdirSync(dir, {
            recursive: true
        })
        console.log(`${clc.green('DIR CREATED')} ${dir}`)
    }

    for (let asset of files) {
        fs.writeFileSync(`${asset.inside}/${asset.name}`, asset.content);
        console.log(`${clc.blueBright('FILE CREATED')} ${asset.name}`)
    }

    for (let package of packages) {
        console.log(clc.cyan(`> Installing +${package} ...`))
        execSync(`npm i ${package}`)
        console.log(clc.green(`INSTALLED PKG ${package}`))
    }

    console.log(clc.green('+ INSTALLATION AND STRUCTURING SUCCESSFUL!'));
}

const createDirectory = (mode) => {
    mode = process.argv[3]

    if (!['new', 'help', 'class-based'].includes(mode)) return console.log(clc.redBright('ERROR: Invalid Options.\n'), clc.green('Options: \n >> new (Empty Project)\n >> help \n >> class-based (OOP Based Project)'))

    if (mode == 'new') createEmptyProject()
    else createClassBased()
}

createDirectory()
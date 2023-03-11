const { execSync } = require("child_process");
const clc = require("cli-color");
const { mkdirSync, writeFileSync, readFileSync } = require("fs");
const { files2 } = require("./foldersAndFiles");
const packages = require("./packages");

const createFilesAndFolders = (folders, files, mode) => {
    for (let dir of folders) {
        mkdirSync(dir, {
            recursive: true
        })
        console.log(`${clc.green('DIR CREATED')} ${clc.magenta(dir)}`)
    }

    if (mode === 'new-cb') {
        for (let file of files) {
            writeFileSync(`${file.inside}/${file.name}`, '');
            console.log(`${clc.blueBright('FILE CREATED')} ${clc.blue(file.name)}`)
        }
    }

    else if (mode === 'class-based' || mode === 'cb') {
        for (let file of files) {
            writeFileSync(`${file.inside}/${file.name}`, file.content);
            console.log(`${clc.blueBright('FILE CREATED')} ${file.name}`)
        }
    }

    else {
        for (let file of files2) {
            writeFileSync(`${file.inside}/${file.name}`, file.content);
            console.log(`${clc.blueBright('FILE CREATED')} ${file.name}`)
        }
    }
}

const installPackages = (packages) => {
    for (let package of packages) {
        console.log(clc.cyan(`>> Installing [${package}] ...`))
        execSync(`npm i ${package}`)
        console.log(clc.green(`>+ INSTALLED PKG [${package}]`))
    }
}

const helpMessage = () => {
    console.log(clc.redBright(' - These are your options:\n'), clc.cyan('>> new-cb (OOP Based Empty Project)\n >> help \n >> class-based (OOP Based Project) \n >> no-app (Suggestion for functional Projects)'))
}

const initGit = () => {
    console.log(clc.cyan('>> Initializing git...'));
    execSync('git init');
    console.log(clc.cyan('>> Initialized ✅✨🎉'));
    console.log(clc.cyan('>> Creating .gitignore ...'));
    writeFileSync(`${process.cwd()}/.gitignore`, 'node_modules\n.env\n')
    console.log(clc.cyan('>> Git Related Shits Done ✅'));
}

const runServer = async () => {
    console.log(clc.cyan('>> Running server...'));
    // console.log(execSync('npm run dev'))
    const { exec } = require('child_process');

    // Run the dev script with nodemon
    const nodemon = exec('npm run dev');
    
    // Print the output of nodemon to the console
    nodemon.stdout.on('data', (data) => {
      console.log(data);
    });
    
    // Handle errors from nodemon
    nodemon.on('error', (err) => {
      console.error(`Error running nodemon: ${err.message}`);
    });
    
    // Handle the exit of nodemon
    nodemon.on('exit', (code, signal) => {
      console.log(`nodemon exited with code ${code} and signal ${signal}`);
    });
    


}

const addDevCommandToPackageJson = () => {
    console.log(`${clc.cyan('>> Adding [dev] command to package.json...')}`)
    // Read the package.json file
    const packageJson = JSON.parse(readFileSync('package.json'));
    
    // Add a new dev script
    packageJson.scripts.dev = 'nodemon index.js';
    
    // Write the modified package.json file
    writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log(`${clc.bgMagenta('>+ Added ✅🎉 ')}`)
}

module.exports = {
    createFilesAndFolders,
    installPackages,
    helpMessage,
    initGit,
    addDevCommandToPackageJson,
    runServer
}
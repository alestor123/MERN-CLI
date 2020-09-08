#! /usr/bin/env node

var { spawn } = require('child_process'),
    name = process.argv[2],
repoURL = 'https://github.com/alestor123/MERN-CLI.git';
if (!name || name.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
        return console.log(`
        Invalid directory name.
        Usage: quick-create-mern name-of-app  
      `);
}
runCommand('git', ['clone', repoURL, name])
  .then(() => {
    return runCommand('rm', ['-rf', `${name}/.git`]);
  }).then(() => {
    console.log('Installing dependencies...');
    return runCommand('npm', ['install'], {
      cwd: process.cwd() + '/' + name
    });
  }).then(() => {
    console.log('Done! 🏁');
    console.log('');
    console.log('To get started:');
    console.log('cd', name);
    console.log('npm run dev');
  });

function runCommand(command, args, options = undefined) {
    const spawned = spawn(command, args, options);  
    return new Promise((resolve) => {
      spawned.stdout.on('data', (data) => {
        console.log(data.toString());
      });
      
      spawned.stderr.on('data', (data) => {
        console.error(data.toString());
      });
      
      spawned.on('close', () => {
        resolve();
      });
    });
  }
  
    
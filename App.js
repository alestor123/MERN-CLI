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


      
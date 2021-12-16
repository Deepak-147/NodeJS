/**Importing and using core Node.js Modules. */
const fs = require('fs')

fs.writeFileSync('notes.txt', 'This file was created by Node.js!')

fs.appendFileSync('notes.txt', ' Welcome to the class')
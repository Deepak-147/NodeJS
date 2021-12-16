/**Importing and using NPM modules. */
const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('deepak@example.com')); //true
console.log(chalk.bold.green('SUCCESS!'));
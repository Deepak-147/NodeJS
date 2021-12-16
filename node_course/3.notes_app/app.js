const yargs = require('yargs');
const chalk = require('chalk');
const notesUtil = require('./notes');

//Customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, //Is option required(mandatory) ?
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true, //Is option required(mandatory) ?
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Adding a new Note!');
        // console.log('Title: ', argv.title);
        // console.log('Body: ', argv.body);
        notesUtil.addNote(argv.title, argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a Note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, //Is option required(mandatory) ?
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.removeNote(argv.title);
    }
});

//Create List command
yargs.command({
    command: 'list',
    describe: 'Listing Notes',
    handler() {
        notesUtil.listNotes();
    }
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'Reading Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, //Is option required(mandatory) ?
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.readNote(argv.title);
    }
});

yargs.parse(); //Parse the commands and arguments
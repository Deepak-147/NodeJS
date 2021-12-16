const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.bold.green.inverse('Added new note!'));
    }
    else {
        console.log(chalk.bold.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const remainingNotes = notes.filter((note) => note.title !== title);

    if (notes.length == remainingNotes.length) {
        console.log(chalk.bold.red.inverse('No Note found!'));
    }
    else {
        saveNotes(remainingNotes);
        console.log(chalk.bold.green.inverse('Note removed!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.yellow.inverse('Your Notes:'));
    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if (foundNote) {
        console.log(chalk.inverse(foundNote.title));
        console.log(foundNote.body);
    }
    else {
        console.log(chalk.bold.red.inverse('Note not found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
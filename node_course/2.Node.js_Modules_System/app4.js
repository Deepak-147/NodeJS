const fs = require('fs');

//JavaScript Object
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}

//Stringified version of object
const bookJSON = JSON.stringify(book);
console.log(bookJSON);
console.log(bookJSON.title); //undefined

//Parsed data
const parsedData = JSON.parse(bookJSON);
console.log(parsedData);
console.log(parsedData.title); //Ego it the Enemy

//Writing the json data to a file.
fs.writeFileSync('1-json.json', bookJSON);
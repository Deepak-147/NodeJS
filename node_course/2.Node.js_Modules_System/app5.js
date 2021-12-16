const fs = require('fs');

//Read the file.
const dataBuffer = fs.readFileSync('1-json.json');
console.log(dataBuffer);

const dataJSON = dataBuffer.toString();
console.log(dataJSON);

const data = JSON.parse(dataJSON);
console.log(data.title);
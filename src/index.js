const path = require('path');
const fileReadEngine = require('./file-read/file-read.engine');
const fileWriteEngine = require('./file-write/file-write.engine');

const imagePath = path.resolve('./images/original.svg');
const readInterface = fileReadEngine.createInterface(imagePath);
const fileWriteStream = fileWriteEngine.createFile();

readInterface.on('line', (line) => {
	fileWriteStream.write(line);
});

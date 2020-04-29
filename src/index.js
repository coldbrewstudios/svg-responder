const path = require('path');
const fileReadEngine = require('./file-read/file-read.engine');
const lineValidationEngine = require('./file-read/line-validation.engine');
const fileWriteEngine = require('./file-write/file-write.engine');

const imagePath = path.resolve('./images/original.svg');
const readInterface = fileReadEngine.createInterface(imagePath);
const fileWriteStream = fileWriteEngine.createFile();

readInterface.on('line', (line) => {
	const containsExcludedTag = lineValidationEngine.containsExcludedTag(line);

	if (!containsExcludedTag) {
		fileWriteStream.write(line);
	}
});

readInterface.on('close', () => {
	fileWriteStream.close();
});

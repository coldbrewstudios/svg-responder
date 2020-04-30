const path = require('path');
const fileReadEngine = require('./read-stream.engine');
const lineValidationEngine = require('../file-read/line-validation.engine');
const fileWriteEngine = require('./write-stream.engine');
const fileLineModificationEngine = require('../file-write/file-line-modification.engine');

function format(imagePath) {
	const readInterface = fileReadEngine.createInterface(imagePath);
	const fileWriteStream = fileWriteEngine.createFile();

	readInterface.on('line', (line) => {
		const containsExcludedTag = lineValidationEngine.containsExcludedTag(line);
		const containsSVGTag = lineValidationEngine.containsSVGTag(line);

		if (containsSVGTag) {
			const editedLine = fileLineModificationEngine.modifySVGTag(line);
			fileWriteStream.write(editedLine);
		} else if (!containsExcludedTag) {
			fileWriteStream.write(line);
		}
	});

	readInterface.on('close', () => {
		fileWriteStream.close();
	});
}

module.exports = {
	format
};

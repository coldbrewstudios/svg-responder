const fs = require('fs');

const outputPath = '../dist/test.svg';

function createFile() {
	try {
		return fs.createWriteStream(outputPath, {
			flags: 'a'
		});
	} catch (e) {
		console.error('Error creating svg file')
	}
}

module.exports = {
	createFile
};

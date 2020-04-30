const fs = require('fs');
const readline = require('readline');

function createInterface(imagePath) {
	const readStream = fs.createReadStream(imagePath);
	const readInterface = readline.createInterface({
		input: readStream
	});

	return readInterface;
}

module.exports = {
	createInterface
};

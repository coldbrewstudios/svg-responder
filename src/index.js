import svgFormatManager from './svg-format/svg-format.manager';
import copy from './util/copy';

const inputElement = document.getElementById('svgInput');
const svgContainerElement = document.getElementById('svgContainer');

inputElement.addEventListener('change', _handleFiles, false);

window.clearExistingElements = _clearExistingElements;

function _handleFiles() {
	const files = this.files;

	Array.from(files).forEach((file) => {
		const downloadReader = new FileReader();
		const reader = new FileReader();
		_handleReader(reader, downloadReader, file);
	});
}

function _handleReader(reader, downloadReader, file) {
	const fileName = file.name;
	clearExistingElements();
	reader.readAsText(file);

	reader.onload = () => _formatImage(reader, downloadReader);
	reader.onerror = () => console.log(reader.error);

	downloadReader.onload = () => _generateImage(downloadReader, fileName);
	downloadReader.onerror = () => console.log(downloadReader.error);
}

function _clearExistingElements() {
	svgContainerElement.innerHTML = '';
	inputElement.value = '';
}

function _formatImage(reader, downloadReader) {
	const linesList = reader.result.split('\n');
	const modifiedLinesList = linesList.reduce(svgFormatManager.format, []);
	const modifiedSVG = modifiedLinesList.join('\n');

	_createDownloadableSVG(downloadReader, modifiedSVG);
}

function _createDownloadableSVG(downloadReader, svgData) {
	const blob = _generateSVGBlob(svgData);
	downloadReader.readAsDataURL(blob);
}

function _generateImage(downloadReader, fileName) {
	const imageContainer = document.createElement('div');
	const linkElement = document.createElement('a');
	const imageElement = document.createElement('img');

	linkElement.setAttribute('href', downloadReader.result);
	linkElement.setAttribute('download', fileName);

	imageContainer.classList.add('image-container');
	linkElement.appendChild(imageElement);
	imageContainer.appendChild(linkElement);
	imageElement.src = downloadReader.result;
	svgContainerElement.appendChild(imageContainer);
}

function _generateSVGBlob(svgData) {
	const blob = new Blob([svgData], {
		type: 'image/svg+xml'
	});

	return blob;
}

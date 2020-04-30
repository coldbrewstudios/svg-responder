import svgFormatManager from './svg-format/svg-format.manager';
import copy from './util/copy';

const inputElement = document.getElementById('svgInput');
const reader = new FileReader();
const downloadReader = new FileReader();

inputElement.addEventListener('change', _handleFiles, false);

window.copyToClipboard = () => copy('svgCopyInput');

function _handleFiles() {
	const file = this.files[0];
	reader.readAsText(file);
}

function _createDownloadableSVG(svgData) {
	const blob = _generateSVGBlob(svgData);
	downloadReader.readAsDataURL(blob);
}

function _generateSVGBlob(svgData) {
	const blob = new Blob([svgData], {
		type: 'image/svg+xml'
	});

	return blob;
}

reader.onload = () => {
	const svgCopyInputElement = document.getElementById('svgCopyInput');
	const svgContainerElement = document.getElementById('svgContainer');
	const linesList = reader.result.split('\n');
	const modifiedLinesList = linesList.reduce(svgFormatManager.format, []);
	const modifiedSVG = modifiedLinesList.join('\n');

	svgContainerElement.innerHTML = modifiedSVG;
	svgCopyInputElement.value = modifiedSVG;
	_createDownloadableSVG(modifiedSVG);
};

downloadReader.onload = () => {
	const downloadButtonElement = document.getElementById('svgDownloadButton');
	downloadButtonElement.href = downloadReader.result;
};

reader.onerror = () => {
	console.log(reader.error);
};

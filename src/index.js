import svgFormatManager from './svg-format/svg-format.manager';
import copy from './util/copy';

const inputElement = document.getElementById('svgInput');
const svgContainerElement = document.getElementById('svgContainer');

window.copyToClipboard = () => copy('svgCopyInput');

inputElement.addEventListener('change', _handleFiles, false);

function _handleFiles() {
	const files = this.files;

	Array.from(files).forEach((file) => {
		const downloadReader = new FileReader();
		const reader = new FileReader();
		_handleReader(reader, downloadReader, file);
	});
}

function _handleReader(reader, downloadReader, file) {
	reader.readAsText(file);

	reader.onload = () => {
		const svgCopyInputElement = document.getElementById('svgCopyInput');
		const linesList = reader.result.split('\n');
		const modifiedLinesList = linesList.reduce(svgFormatManager.format, []);
		const modifiedSVG = modifiedLinesList.join('\n');

		svgCopyInputElement.value = modifiedSVG;
		_createDownloadableSVG(downloadReader, modifiedSVG);
	};

	downloadReader.onload = () => {
		const imageElement = document.createElement('img');
		imageElement.src = downloadReader.result;
		svgContainerElement.appendChild(imageElement);
	};

	reader.onerror = () => console.log(reader.error);
	downloadReader.onerror = () => console.log(downloadReader.error);
}


function _createDownloadableSVG(downloadReader, svgData) {
	const blob = _generateSVGBlob(svgData);
	downloadReader.readAsDataURL(blob);
}

function _generateSVGBlob(svgData) {
	const blob = new Blob([svgData], {
		type: 'image/svg+xml'
	});

	return blob;
}

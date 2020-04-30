import * as lineValidationEngine from '../file-read/line-validation.engine.mjs';
import * as fileLineModificationEngine from '../file-write/file-line-modification.engine.mjs';

const inputElement = document.getElementById('svgInput');
inputElement.addEventListener('change', handleFiles, false);

let reader = new FileReader();
let downloadReader = new FileReader();

function handleFiles() {
	const file = this.files[0];
	reader.readAsText(file);
}

window.copyToClipboard = () => {
	const svgCopyInputElement = document.getElementById('svgCopyInput');
	svgCopyInputElement.select();
	document.execCommand('copy');
};

reader.onload = () => {
	const svgCopyInputElement = document.getElementById('svgCopyInput');
	const svgContainerElement = document.getElementById('svgContainer');
	const linesList = reader.result.split('\n');
	const modifiedLinesList = linesList.reduce(format, []);
	const modifiedSVG = modifiedLinesList.join('\n');
	svgContainerElement.innerHTML = modifiedSVG;

	svgCopyInputElement.value = modifiedSVG;

	const blob = new Blob([modifiedSVG], {
		type: 'image/svg+xml'
	});

	downloadReader.readAsDataURL(blob);
};

downloadReader.onload = () => {
	const downloadButtonElement = document.getElementById('svgDownloadButton');
	downloadButtonElement.href = downloadReader.result;
};

reader.onerror = () => {
	console.log(reader.error);
};

function format(acc, line) {
	const containsExcludedTag = lineValidationEngine.containsExcludedTag(line);
	const containsSVGTag = lineValidationEngine.containsSVGTag(line);

	if (containsSVGTag) {
		const editedLine = fileLineModificationEngine.modifySVGTag(line);
		acc.push(editedLine);
	} else if (!containsExcludedTag) {
		acc.push(line);
	}

	return acc;
}

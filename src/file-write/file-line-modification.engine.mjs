const aspectRatioString = 'preserveAspectRatio="xMidYMax meet"';

export function modifySVGTag(line) {
	const lineData = line.split(' ');
	lineData.splice(1, 0, aspectRatioString);
	const modifiedLineData = lineData.filter(_removeUnneededTagAttributes);

	return modifiedLineData.join(' ');
}

function _removeUnneededTagAttributes(attribute) {
	return (!_containsWidthAttribute(attribute) && !_containsHeightAttribute(attribute));
}

function _containsWidthAttribute(attribute) {
	return attribute.includes('width');
}

function _containsHeightAttribute(attribute) {
	return attribute.includes('height');
}

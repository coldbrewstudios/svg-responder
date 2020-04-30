import * as fileLineModificationEngine from './line-modification.engine';
import * as lineValidationEngine from './line-validation.engine';

function format(acc, line) {
	const containsExcludedTag = lineValidationEngine.containsExcludedTag(line);
	const containsSVGTag = lineValidationEngine.containsSVGTag(line);
	const containsResponsiveAttribute = lineValidationEngine.containsResponsiveAttribute(line);

	if (containsSVGTag && !containsResponsiveAttribute) {
		const editedLine = fileLineModificationEngine.modifySVGTag(line);
		acc.push(editedLine);
	} else if (!containsExcludedTag) {
		acc.push(line);
	}

	return acc;
}

const svgFormatManager = {
	format
};

export default svgFormatManager;

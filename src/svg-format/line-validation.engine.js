import { regexTypes } from './regex-types.const.js';

export function containsExcludedTag(line) {
	const containsExcludedTag = regexTypes.excludeChecks.filter((excludeCheck) => line.match(excludeCheck.regex));
	return containsExcludedTag.length > 0;
}

export function containsSVGTag(line) {
	return line.match(regexTypes.svgTag.regex);
}

export function containsResponsiveAttribute(line) {
	return line.match(regexTypes.responsiveAttribute.regex);
}

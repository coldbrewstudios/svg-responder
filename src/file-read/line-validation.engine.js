const regexTypes = require('./regex-types.const');

function containsExcludedTag(line) {
	const containsExcludedTag = regexTypes.excludeChecks.filter((excludeCheck) => line.match(excludeCheck.regex));
	return containsExcludedTag.length > 0;
}

module.exports = {
	containsExcludedTag
};

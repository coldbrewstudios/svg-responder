module.exports = {
	excludeChecks: [
		{
			regex: new RegExp(/<\?xml[\s\S]*?\?>/),
		},
		{
			regex: new RegExp(/<!--[\s\S]*?-->/),
		},
		{
			regex: new RegExp(/<!--[\s\S]*?-->/),
		},
		{
			regex: new RegExp(/<desc[\s\S]*?<\/desc>/),
		}
	],
	svgTag: new RegExp(/<svg[\s\S]*?>/),
};

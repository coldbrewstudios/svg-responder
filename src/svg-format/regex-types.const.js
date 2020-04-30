export const regexTypes = {
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
	svgTag: {
		regex: new RegExp(/<svg[\s\S]*?>/)
	},
	responsiveAttribute: {
		regex: new RegExp(/preserveAspectRatio/)
	}
};

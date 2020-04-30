function copy(elementID) {
	const element = document.getElementById(elementID);
	element.select();
	document.execCommand('copy');
}

export default copy

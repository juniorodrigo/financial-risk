module.exports.textToUrlText = (text) => {
	return encodeURIComponent(text)
		.replace(/[!'()*]/g, escape)
		.replace(/%20/g, "+");
};

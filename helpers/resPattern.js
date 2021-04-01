/**
 * @param {number} code - Status code
 * @param {*} data - Object or string or any format data.
 * @param {string} status - eg. 'success'
 */
 let successPattern = (code, data, status) => {
	return {
		'code': code,
		'data': data,
		'status': status
	};
};

/**
 * @param {number} code - Status code
 * @param {*} data - Object or string or any format data.
 * @param {string} status - eg. 'failed'
 */
let errorPattern = (code, message, status) => {
	return {
		'code': code,
		'data': message,
		'status': status
	};
};

module.exports = {
	successPattern,
	errorPattern
};
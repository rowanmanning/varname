'use strict';

/**
 * Convert a variable name string to camelback style.
 *
 * @public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
exports.camelback = function camelback(name) {
	const parts = exports.split(name);
	return parts.shift() + parts.map(titleCase).join('');
};

/**
 * Convert a variable name string to camelcase style.
 *
 * @public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
exports.camelcase = function camelcase(name) {
	const parts = exports.split(name);
	return parts.map(titleCase).join('');
};

/**
 * Convert a variable name string to dash-separated style.
 *
 * @public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
exports.dash = function dash(name) {
	return exports.split(name).join('-');
};

/**
 * Convert a variable name string to underscore-separated style.
 *
 * @public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
exports.underscore = function underscore(name) {
	return exports.split(name).join('_');
};

/**
 * Split a variable name string into parts.
 *
 * @public
 * @param {string} name
 *     The variable name to split.
 * @returns {Array<string>}
 *     Returns the variable name split into separate parts.
 */
exports.split = function split(name) {
	name = name
		.replace(/[^a-z0-9]+/gi, ' ')
		.replace(/([A-Z0-9]+)([A-Z][a-z])/g, '$1 $2')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.toLowerCase();
	return name.trim().split(/\s+/);
};

/**
 * Title-case a string.
 *
 * @private
 * @param {string} string
 *     The string to title-case.
 * @returns {string}
 *     Returns the title-cased string.
 */
function titleCase(string) {
	return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
}

exports.default = exports;

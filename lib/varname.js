/**
 * @module varname
 */
'use strict';

const varname = module.exports = {
	camelback,
	camelcase,
	dash,
	underscore,
	split
};

/**
 * Convert a variable name string to camelback style.
 *
 * @access public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
function camelback(name) {
	const parts = varname.split(name);
	return parts.shift() + parts.map(titleCase).join('');
}

/**
 * Convert a variable name string to camelcase style.
 *
 * @access public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
function camelcase(name) {
	const parts = varname.split(name);
	return parts.map(titleCase).join('');
}

/**
 * Convert a variable name string to dash-separated style.
 *
 * @access public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
function dash(name) {
	return varname.split(name).join('-');
}

/**
 * Convert a variable name string to underscore-separated style.
 *
 * @access public
 * @param {string} name
 *     The variable name to convert.
 * @returns {string}
 *     Returns the converted variable name.
 */
function underscore(name) {
	return varname.split(name).join('_');
}

/**
 * Split a variable name string into parts.
 *
 * @access public
 * @param {string} name
 *     The variable name to split.
 * @returns {Array<string>}
 *     Returns the variable name split into separate parts.
 */
function split(name) {
	name = name
		.replace(/[^a-z0-9]+/gi, ' ')
		.replace(/([A-Z0-9]+)([A-Z][a-z])/g, '$1 $2')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.toLowerCase();
	return name.trim().split(/\s+/);
}

/**
 * Title-case a string.
 *
 * @access private
 * @param {string} string
 *     The string to title-case.
 * @returns {string}
 *     Returns the title-cased string.
 */
function titleCase(string) {
	return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
}

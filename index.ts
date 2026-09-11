const whitespaceSequence = /\s+/;

/**
 * Convert a variable name string to camelback style.
 */
export function camelback(name: string) {
	const parts = split(name);
	return parts.shift() + parts.map(titleCase).join('');
}

/**
 * Convert a variable name string to camelcase style.
 */
export function camelcase(name: string) {
	const parts = split(name);
	return parts.map(titleCase).join('');
}

/**
 * Convert a variable name string to dash-separated style.
 */
export function dash(name: string) {
	return split(name).join('-');
}

/**
 * Convert a variable name string to underscore-separated style.
 */
export function underscore(name: string) {
	return split(name).join('_');
}

/**
 * Split a variable name string into parts.
 */
export function split(name: string) {
	return name
		.replace(/[^a-z0-9]+/gi, ' ')
		.replace(/([A-Z0-9]+)([A-Z][a-z])/g, '$1 $2')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.toLowerCase()
		.trim()
		.split(whitespaceSequence);
}

/**
 * Title-case a string.
 */
function titleCase(string: string) {
	return `${string.charAt(0).toUpperCase()}${string.substring(1)}`;
}

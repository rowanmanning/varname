(function (root) {
    // global define
    'use strict';

    // Polyfill String.prototype.trim
    /* istanbul ignore next */
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    // Split a variable name string into parts
    function split (str) {
        return str
            .replace(/[^a-z0-9]+/gi, ' ')
            .replace(/([A-Z]+)/g, ' $1')
            .toLowerCase()
            .trim()
            .split(/\s+/);
    }

    // Convert all strings in an array to title-case
    function titleCaseWords (parts) {
        var results = [];
        for (var i = 0; i < parts.length; i ++) {
            results.push(parts[i].charAt(0).toUpperCase() + parts[i].substr(1));
        }
        return results;
    }

    // Convert a variable name string to camelback style
    function camelback (str) {
        var parts = split(str);
        return parts.shift() + titleCaseWords(parts).join('');
    }

    // Convert a variable name string to camelcase style
    function camelcase (str) {
        return titleCaseWords(split(str)).join('');
    }

    // Convert a variable name string to dash-separated style
    function dash (str) {
        return split(str).join('-');
    }

    // Convert a variable name string to underscore-separated style
    function underscore (str) {
        return split(str).join('_');
    }

    // Exports
    var varname = {
        split: split,
        camelback: camelback,
        camelcase: camelcase,
        dash: dash,
        underscore: underscore
    };

    // AMD
    /* istanbul ignore next */
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return varname;
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = varname;
    }
    // Script tag
    else {
        /* istanbul ignore next */
        root.varname = varname;
    }

}(this));

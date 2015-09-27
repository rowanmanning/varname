/*! Varname 1.0.2 | https://github.com/rowanmanning/varname */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.varname = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    split: split,
    camelback: camelback,
    camelcase: camelcase,
    dash: dash,
    underscore: underscore
};

// Split a variable name string into parts
function split (string) {
    string = string
        .replace(/[^a-z0-9]+/gi, ' ')
        .replace(/([A-Z]+)/g, ' $1')
        .toLowerCase();
    return trim(string).split(/\s+/);
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

// Trim whitespace from a string
function trim (string) {
    return string.replace(/^\s+|\s+$/g, '');
}

},{}]},{},[1])(1)
});
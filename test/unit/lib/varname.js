// jshint maxstatements: false
// jscs:disable disallowMultipleVarDecl, disallowQuotedKeysInObjects, maximumLineLength
'use strict';

var assert = require('proclaim');
var varname = require('../../../lib/varname');

describe('varname', function () {

    it('should be an object', function () {
        assert.strictEqual(typeof varname, 'object');
    });

    describe('split', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof varname.split, 'function');
        });

        it('should return an array', function () {
            assert.strictEqual(Object.prototype.toString.call(varname.split('foo')), '[object Array]');
        });

        it('should split strings correctly', function () {
            var test, tests = {

                'foobar': 'foobar',
                ' foobar ': 'foobar',

                'foo-bar': 'foo,bar',
                'foo_bar': 'foo,bar',
                'fooBar': 'foo,bar',
                'FooBar': 'foo,bar',

                'foo-bar-baz': 'foo,bar,baz',
                'foo_bar_baz': 'foo,bar,baz',
                'fooBarBaz': 'foo,bar,baz',
                'FooBarBaz': 'foo,bar,baz',

                'foo12-bar34-baz56': 'foo12,bar34,baz56',
                'foo12_bar34_baz56': 'foo12,bar34,baz56',
                'foo12Bar34Baz56': 'foo12,bar34,baz56',
                'Foo12Bar34Baz56': 'foo12,bar34,baz56',

                'FOOBARBAZ': 'foobarbaz',
                '/foo/bar/baz!': 'foo,bar,baz',
                'FOO BAR BAZ': 'foo,bar,baz',
                'foo_-_bar_-_baz': 'foo,bar,baz',
                'foo__bar--baz': 'foo,bar,baz',
                'foo.bar.baz': 'foo,bar,baz',
                '♥/foo|bar|baz/♥': 'foo,bar,baz'

            };
            for (test in tests) {
                if (tests.hasOwnProperty(test)) {
                    assert.strictEqual(varname.split(test).join(','), tests[test]);
                }
            }
        });

    });

    describe('camelback', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof varname.camelback, 'function');
        });

        it('should return a string', function () {
            assert.strictEqual(typeof varname.camelback('foo'), 'string');
        });

        it('should join string parts and uppercase all first letters past the first part', function () {
            assert.strictEqual(varname.camelback('foo'), 'foo');
            assert.strictEqual(varname.camelback('foo bar baz'), 'fooBarBaz');
        });

    });

    describe('camelcase', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof varname.camelcase, 'function');
        });

        it('should return a string', function () {
            assert.strictEqual(typeof varname.camelcase('foo'), 'string');
        });

        it('should join string parts and uppercase all first letters', function () {
            assert.strictEqual(varname.camelcase('foo'), 'Foo');
            assert.strictEqual(varname.camelcase('foo bar baz'), 'FooBarBaz');
        });

    });

    describe('dash', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof varname.dash, 'function');
        });

        it('should return a string', function () {
            assert.strictEqual(typeof varname.dash('foo'), 'string');
        });

        it('should join string parts with dashes', function () {
            assert.strictEqual(varname.dash('foo'), 'foo');
            assert.strictEqual(varname.dash('foo bar baz'), 'foo-bar-baz');
        });

    });

    describe('underscore', function () {

        it('should be a function', function () {
            assert.strictEqual(typeof varname.underscore, 'function');
        });

        it('should return a string', function () {
            assert.strictEqual(typeof varname.underscore('foo'), 'string');
        });

        it('should join string parts with underscores', function () {
            assert.strictEqual(varname.underscore('foo'), 'foo');
            assert.strictEqual(varname.underscore('foo bar baz'), 'foo_bar_baz');
        });

    });

});

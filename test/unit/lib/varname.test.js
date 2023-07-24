'use strict';

const assert = require('node:assert');
const td = require('testdouble');

describe('lib/varname', () => {
	let varname;

	beforeEach(() => {
		varname = require('../../../lib/varname');
	});

	it('is an object', () => {
		assert.strictEqual(typeof varname, 'object');
	});

	it('has a `camelback` method', () => {
		assert.strictEqual(typeof varname.camelback, 'function');
	});

	describe('.camelback(name)', () => {
		let result;

		beforeEach(() => {
			td.replace(varname, 'split');
			td.when(varname.split('foo-bar-baz')).thenReturn(['foo', 'bar', 'baz']);
			result = varname.camelback('foo-bar-baz');
		});

		it('calls `varname.split` with the input name', () => {
			td.verify(varname.split('foo-bar-baz'), {times: 1});
		});

		it('joins and returns the result of the split in camelback style', () => {
			assert.strictEqual(result, 'fooBarBaz');
		});

	});

	it('has a `camelcase` method', () => {
		assert.strictEqual(typeof varname.camelcase, 'function');
	});

	describe('.camelcase(name)', () => {
		let result;

		beforeEach(() => {
			td.replace(varname, 'split');
			td.when(varname.split('foo-bar-baz')).thenReturn(['foo', 'bar', 'baz']);
			result = varname.camelcase('foo-bar-baz');
		});

		it('calls `varname.split` with the input name', () => {
			td.verify(varname.split('foo-bar-baz'), {times: 1});
		});

		it('joins and returns the result of the split in camelcase style', () => {
			assert.strictEqual(result, 'FooBarBaz');
		});

	});

	it('has a `dash` method', () => {
		assert.strictEqual(typeof varname.dash, 'function');
	});

	describe('.dash(name)', () => {
		let result;

		beforeEach(() => {
			td.replace(varname, 'split');
			td.when(varname.split('foo-bar-baz')).thenReturn(['foo', 'bar', 'baz']);
			result = varname.dash('foo-bar-baz');
		});

		it('calls `varname.split` with the input name', () => {
			td.verify(varname.split('foo-bar-baz'), {times: 1});
		});

		it('joins and returns the result of the split in dashed style', () => {
			assert.strictEqual(result, 'foo-bar-baz');
		});

	});

	it('has an `underscore` method', () => {
		assert.strictEqual(typeof varname.underscore, 'function');
	});

	describe('.underscore(name)', () => {
		let result;

		beforeEach(() => {
			td.replace(varname, 'split');
			td.when(varname.split('foo-bar-baz')).thenReturn(['foo', 'bar', 'baz']);
			result = varname.underscore('foo-bar-baz');
		});

		it('calls `varname.split` with the input name', () => {
			td.verify(varname.split('foo-bar-baz'), {times: 1});
		});

		it('joins and returns the result of the split in underscored style', () => {
			assert.strictEqual(result, 'foo_bar_baz');
		});

	});

	it('has a `split` method', () => {
		assert.strictEqual(typeof varname.split, 'function');
	});

	describe('.split(name)', () => {
		const expected = [
			'foo',
			'bar',
			'baz'
		];

		it('returns an array', () => {
			assert.ok(Array.isArray(varname.split('foo-bar-baz')));
		});

		it('splits camelback style variable names', () => {
			assert.deepStrictEqual(varname.split('fooBarBaz'), expected);
		});

		it('splits camelcase style variable names', () => {
			assert.deepStrictEqual(varname.split('FooBarBaz'), expected);
		});

		it('splits dash style variable names', () => {
			assert.deepStrictEqual(varname.split('foo-bar-baz'), expected);
		});

		it('splits underscore style variable names', () => {
			assert.deepStrictEqual(varname.split('foo_bar_baz'), expected);
		});

		it('splits non-standard names correctly', () => {
			assert.deepStrictEqual(varname.split('/foo/bar/baz!'), expected);
			assert.deepStrictEqual(varname.split('FOO BAR BAZ'), expected);
			assert.deepStrictEqual(varname.split('foo_-_bar_-_baz'), expected);
			assert.deepStrictEqual(varname.split('foo__bar--baz'), expected);
			assert.deepStrictEqual(varname.split('foo.bar.baz'), expected);
			assert.deepStrictEqual(varname.split('♥/foo|bar|baz/♥'), expected);
			assert.deepStrictEqual(varname.split('FOOBarBAZ'), expected);
		});

		it('splits numbers in names correctly', () => {
			assert.deepStrictEqual(varname.split('123'), ['123']);
			assert.deepStrictEqual(varname.split('123foo'), ['123foo']);
			assert.deepStrictEqual(varname.split('123foo-bar'), ['123foo', 'bar']);
			assert.deepStrictEqual(varname.split('foo123-456'), ['foo123', '456']);
			assert.deepStrictEqual(varname.split('foo123bar'), ['foo123bar']);
			assert.deepStrictEqual(varname.split('foo123Bar'), ['foo123', 'bar']);
		});

		it('splits names containing numbers correctly', () => {
			assert.deepStrictEqual(varname.split('foo12Bar34Baz56'), [
				'foo12',
				'bar34',
				'baz56'
			]);
		});

	});

	describe('.default', () => {
		it('aliases the module exports', () => {
			assert.strictEqual(varname, varname.default);
		});
	});

});

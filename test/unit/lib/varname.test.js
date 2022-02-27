'use strict';

const {assert} = require('chai');
const td = require('testdouble');

describe('lib/varname', () => {
	let varname;

	beforeEach(() => {
		varname = require('../../../lib/varname');
	});

	it('is an object', () => {
		assert.isObject(varname);
	});

	it('has a `camelback` method', () => {
		assert.isFunction(varname.camelback);
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
		assert.isFunction(varname.camelcase);
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
		assert.isFunction(varname.dash);
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
		assert.isFunction(varname.underscore);
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
		assert.isFunction(varname.split);
	});

	describe('.split(name)', () => {
		const expected = [
			'foo',
			'bar',
			'baz'
		];

		it('returns an array', () => {
			assert.isArray(varname.split('foo-bar-baz'));
		});

		it('splits camelback style variable names', () => {
			assert.deepEqual(varname.split('fooBarBaz'), expected);
		});

		it('splits camelcase style variable names', () => {
			assert.deepEqual(varname.split('FooBarBaz'), expected);
		});

		it('splits dash style variable names', () => {
			assert.deepEqual(varname.split('foo-bar-baz'), expected);
		});

		it('splits underscore style variable names', () => {
			assert.deepEqual(varname.split('foo_bar_baz'), expected);
		});

		it('splits non-standard names correctly', () => {
			assert.deepEqual(varname.split('/foo/bar/baz!'), expected);
			assert.deepEqual(varname.split('FOO BAR BAZ'), expected);
			assert.deepEqual(varname.split('foo_-_bar_-_baz'), expected);
			assert.deepEqual(varname.split('foo__bar--baz'), expected);
			assert.deepEqual(varname.split('foo.bar.baz'), expected);
			assert.deepEqual(varname.split('♥/foo|bar|baz/♥'), expected);
			assert.deepEqual(varname.split('FOOBarBAZ'), expected);
		});

		it('splits numbers in names correctly', () => {
			assert.deepEqual(varname.split('123'), ['123']);
			assert.deepEqual(varname.split('123foo'), ['123foo']);
			assert.deepEqual(varname.split('123foo-bar'), ['123foo', 'bar']);
			assert.deepEqual(varname.split('foo123-456'), ['foo123', '456']);
			assert.deepEqual(varname.split('foo123bar'), ['foo123bar']);
			assert.deepEqual(varname.split('foo123Bar'), ['foo123', 'bar']);
		});

		it('splits names containing numbers correctly', () => {
			assert.deepEqual(varname.split('foo12Bar34Baz56'), [
				'foo12',
				'bar34',
				'baz56'
			]);
		});

	});

});

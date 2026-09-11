import assert from 'node:assert';
import { describe, it } from 'node:test';
import { camelback, camelcase, dash, split, underscore } from '../../index.ts';

describe('varname', () => {
	describe('.camelback(name)', () => {
		it('returns the name in camelback style', () => {
			const result = camelback('foo-bar-baz');
			assert.strictEqual(result, 'fooBarBaz');
		});
	});

	describe('.camelcase(name)', () => {
		it('joins and returns the name in camelcase style', () => {
			const result = camelcase('foo-bar-baz');
			assert.strictEqual(result, 'FooBarBaz');
		});
	});

	describe('.dash(name)', () => {
		it('joins and returns the name in dashed style', () => {
			const result = dash('fooBarBaz');
			assert.strictEqual(result, 'foo-bar-baz');
		});
	});

	describe('.underscore(name)', () => {
		it('joins and returns the name in underscored style', () => {
			const result = underscore('foo-bar-baz');
			assert.strictEqual(result, 'foo_bar_baz');
		});
	});

	describe('.split(name)', () => {
		const expected = ['foo', 'bar', 'baz'];

		it('returns an array', () => {
			assert.ok(Array.isArray(split('foo-bar-baz')));
		});

		it('splits camelback style variable names', () => {
			assert.deepStrictEqual(split('fooBarBaz'), expected);
		});

		it('splits camelcase style variable names', () => {
			assert.deepStrictEqual(split('FooBarBaz'), expected);
		});

		it('splits dash style variable names', () => {
			assert.deepStrictEqual(split('foo-bar-baz'), expected);
		});

		it('splits underscore style variable names', () => {
			assert.deepStrictEqual(split('foo_bar_baz'), expected);
		});

		it('splits non-standard names correctly', () => {
			assert.deepStrictEqual(split('/foo/bar/baz!'), expected);
			assert.deepStrictEqual(split('FOO BAR BAZ'), expected);
			assert.deepStrictEqual(split('foo_-_bar_-_baz'), expected);
			assert.deepStrictEqual(split('foo__bar--baz'), expected);
			assert.deepStrictEqual(split('foo.bar.baz'), expected);
			assert.deepStrictEqual(split('♥/foo|bar|baz/♥'), expected);
			assert.deepStrictEqual(split('FOOBarBAZ'), expected);
		});

		it('splits numbers in names correctly', () => {
			assert.deepStrictEqual(split('123'), ['123']);
			assert.deepStrictEqual(split('123foo'), ['123foo']);
			assert.deepStrictEqual(split('123foo-bar'), ['123foo', 'bar']);
			assert.deepStrictEqual(split('foo123-456'), ['foo123', '456']);
			assert.deepStrictEqual(split('foo123bar'), ['foo123bar']);
			assert.deepStrictEqual(split('foo123Bar'), ['foo123', 'bar']);
		});

		it('splits names containing numbers correctly', () => {
			assert.deepStrictEqual(split('foo12Bar34Baz56'), ['foo12', 'bar34', 'baz56']);
		});
	});
});

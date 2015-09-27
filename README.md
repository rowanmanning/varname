
Varname
=======

Convert strings between different variable naming formats.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![Code coverage][shield-coverage]][info-coverage]
[![Dependencies][shield-dependencies]][info-dependencies]
[![MIT licensed][shield-license]][info-license]

**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–17, Google Chrome 14–25, Internet Explorer 6–10, Mobile Safari iOS 3–6, Opera 12.10, Safari 5–6*


Getting Started
---------------

You can use Varname on the server side with [Node.js][node] and npm:

```sh
npm install varname
```

On the client side, you can either install Varname through [Component][component]:

```sh
component install rowanmanning/varname
```

or by simply including `varname.js` in your page:

```html
<script src="path/to/lib/varname.js"></script>
```


Usage
-----

In Node.js or using Component, you can include Varname in your script by using require:

```js
var varname = require('varname');
```

Varname also works with AMD-style module loaders, just specify it as a dependency.

If you're just including with a `<script>`, `varname` is available as a global variable.


### varname.camelback( str )

Convert a variable name to camelBack format (capitalize the first letter of all but the first word).  
**str:** *(string)* The string to convert.  
**return:** *(string)* Returns the converted string.

```js
varname.camelback('foo_bar_baz'); // 'fooBarBaz'
```


### varname.camelcase( str )

Convert a variable name to CamelCase format (capitalize the first letter of each word).  
**str:** *(string)* The string to convert.  
**return:** *(string)* Returns the converted string.

```js
varname.camelcase('foo_bar_baz'); // 'FooBarBaz'
```


### varname.dash( str )

Convert a variable name to dash format.  
**str:** *(string)* The string to convert.  
**return:** *(string)* Returns the converted string.

```js
varname.dash('FooBarBaz'); // 'foo-bar-baz'
```


### varname.underscore( str )

Convert a variable name to underscore format.  
**str:** *(string)* The string to convert.  
**return:** *(string)* Returns the converted string.

```js
varname.underscore('FooBarBaz'); // 'foo_bar_baz'
```


### varname.split( str )

Split a string into separate variable parts. This allows you to write your own format converters easily.
**str:** *(string)* The string to split.  
**return:** *(array)* Returns an array of parts.

```js
varname.split('fooBarBaz');
varname.split('FooBarBaz');
varname.split('foo-bar-baz');
varname.split('foo_bar_baz');
varname.split('♥~foo|bar|baz~♥');
// all return ['foo', 'bar', 'baz']
```


Contributing
------------

To contribute to Varname, clone this repo locally and commit your code on a separate branch.

If you're making core library changes please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
make ci
```


License
-------

Varname is licensed under the [MIT][info-license] license.  
Copyright &copy; 2015, Rowan Manning



[component]: https://github.com/component/component
[make]: http://gnuwin32.sourceforge.net/packages/make.htm
[node]: http://nodejs.org/

[info-coverage]: https://coveralls.io/github/rowanmanning/varname
[info-dependencies]: https://gemnasium.com/rowanmanning/varname
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/varname
[info-build]: https://travis-ci.org/rowanmanning/varname
[shield-coverage]: https://img.shields.io/coveralls/rowanmanning/varname.svg
[shield-dependencies]: https://img.shields.io/gemnasium/rowanmanning/varname.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-0.10–4-brightgreen.svg
[shield-npm]: https://img.shields.io/npm/v/varname.svg
[shield-build]: https://img.shields.io/travis/rowanmanning/varname/master.svg

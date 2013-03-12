
Varname
=======

Convert strings between different variable naming formats.

**Current Version:** *1.0.2*  
**Build Status:** [![Build Status][travis-status]][travis]  
**Node Support:** *0.6, 0.8, 0.10*  
**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–17, Google Chrome 14–25, Internet Explorer 6–10, Mobile Safari iOS 3–6, Opera 12.10, Safari 5–6*


Getting Started
---------------

You can use Varname on the server side with [Node.js][node] and npm:

```sh
$ npm install varname
```

On the client side, you can either install Varname through [Component][component]:

```sh
$ component install rowanmanning/varname
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


Development
-----------

To develop Varname, you'll need to clone the repo and install dependencies with `make deps`. If you're on Windows, you'll also need to install [Make for Windows][make].

Once you're set up, you can run the following commands:

```sh
$ make deps         # Install dependencies
$ make lint         # Run JSHint with the correct config
$ make test         # Run unit tests in Node
$ make test-server  # Run a server for browser unit testing (visit localhost:3000)
```

When no build target is specified, make will run `deps lint test`. This means you can use the following command for brevity:

```sh
$ make
```

Code with lint errors or no/failing tests will not be accepted, please use the build tools outlined above.


License
-------

Varname is licensed under the [MIT][mit] license.



[component]: https://github.com/component/component
[make]: http://gnuwin32.sourceforge.net/packages/make.htm
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://travis-ci.org/rowanmanning/varname
[travis-status]: https://travis-ci.org/rowanmanning/varname.png?branch=master


# Varname

Convert strings between different variable naming formats.


## Table of Contents

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)


## Requirements

This library requires the following to run:

  * [Node.js](https://nodejs.org/) 14+


## Usage

Install with [npm](https://www.npmjs.com/):

```sh
npm install varname
```

Load the library into your code with a `require` call:

```js
const varname = require('varname');
```


### varname.camelback( name )

Convert a variable name to camelBack format (capitalize the first letter of all but the first word).  
**name:** *(string)* The variable name to convert.  
**return:** *(string)* Returns the converted variable name.

```js
varname.camelback('foo_bar_baz'); // 'fooBarBaz'
```


### varname.camelcase( name )

Convert a variable name to CamelCase format (capitalize the first letter of each word).  
**name:** *(string)* The variable name to convert.  
**return:** *(string)* Returns the converted variable name.

```js
varname.camelcase('foo_bar_baz'); // 'FooBarBaz'
```


### varname.dash( name )

Convert a variable name to dash format.  
**name:** *(string)* The variable name to convert.  
**return:** *(string)* Returns the converted variable name.

```js
varname.dash('FooBarBaz'); // 'foo-bar-baz'
```


### varname.underscore( name )

Convert a variable name to underscore format.  
**name:** *(string)* The variable name to convert.  
**return:** *(string)* Returns the converted variable name.

```js
varname.underscore('FooBarBaz'); // 'foo_bar_baz'
```


### varname.split( name )

Split a string into separate variable parts. This allows you to write your own format converters easily.
**name:** *(string)* The variable name to split.  
**return:** *(array)* Returns an array of parts.

```js
varname.split('fooBarBaz');
varname.split('FooBarBaz');
varname.split('FOOBarBAZ');
varname.split('foo-bar-baz');
varname.split('foo_bar_baz');
varname.split('♥~foo|bar|baz~♥');
// all return ['foo', 'bar', 'baz']
```


## Contributing

[The contributing guide is available here](docs/contributing.md). All contributors must follow [this library's code of conduct](docs/code_of_conduct.md).


## License

Licensed under the [MIT](LICENSE) license.<br/>
Copyright &copy; 2015, Rowan Manning
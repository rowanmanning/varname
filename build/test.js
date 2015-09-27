(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":3,"inherits":2}],6:[function(require,module,exports){
(function (global){
(function (root) {
    'use strict';

    var proclaim = ok;


    // Assertions as outlined in
    // http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert
    // -----------------------------------------------------

    // Assert that a value is truthy
    function ok (val, msg) {
        if (!!!val) {
            fail(val, true, msg, '==');
        }
    }
    proclaim.ok = ok;

    // Assert that two values are equal
    proclaim.equal = function (actual, expected, msg) {
        /* jshint eqeqeq: false */
        if (actual != expected) {
            fail(actual, expected, msg, '==');
        }
    };

    // Assert that two values are not equal
    proclaim.notEqual = function (actual, expected, msg) {
        /* jshint eqeqeq: false */
        if (actual == expected) {
            fail(actual, expected, msg, '!=');
        }
    };

    // Assert that two values are equal with strict comparison
    proclaim.strictEqual = function (actual, expected, msg) {
        if (actual !== expected) {
            fail(actual, expected, msg, '===');
        }
    };

    // Assert that two values are not equal with strict comparison
    proclaim.notStrictEqual = function (actual, expected, msg) {
        if (actual === expected) {
            fail(actual, expected, msg, '!==');
        }
    };

    // Assert that two values are deeply equal
    proclaim.deepEqual = function (actual, expected, msg) {
        if (!isDeepEqual(actual, expected)) {
            fail(actual, expected, msg, 'deepEqual');
        }
    };

    // Assert that two values are not deeply equal
    proclaim.notDeepEqual = function (actual, expected, msg) {
        if (isDeepEqual(actual, expected)) {
            fail(actual, expected, msg, '!deepEqual');
        }
    };

    // Assert that a function throws an error
    proclaim.throws = function (fn, expected, msg) {
        if (!functionThrows(fn, expected)) {
            fail(fn, expected, msg, 'throws');
        }
    };


    // Additional assertions
    // ---------------------

    // Assert that a value is falsy
    proclaim.notOk = function (val, msg) {
        if (!!val) {
            fail(val, true, msg, '!=');
        }
    };

    // Assert that a function does not throw an error
    proclaim.doesNotThrow = function (fn, expected, msg) {
        if (functionThrows(fn, expected)) {
            fail(fn, expected, msg, '!throws');
        }
    };

    // Assert that a value is a specific type
    proclaim.isTypeOf = function (val, type, msg) {
        proclaim.strictEqual(typeof val, type, msg);
    };

    // Assert that a value is not a specific type
    proclaim.isNotTypeOf = function (val, type, msg) {
        proclaim.notStrictEqual(typeof val, type, msg);
    };

    // Assert that a value is an instance of a constructor
    proclaim.isInstanceOf = function (val, constructor, msg) {
        if (!(val instanceof constructor)) {
            fail(val, constructor, msg, 'instanceof');
        }
    };

    // Assert that a value not an instance of a constructor
    proclaim.isNotInstanceOf = function (val, constructor, msg) {
        if (val instanceof constructor) {
            fail(val, constructor, msg, '!instanceof');
        }
    };

    // Assert that a value is an array
    proclaim.isArray = function (val, msg) {
        if (!isArray(val)) {
            fail(typeof val, 'array', msg, '===');
        }
    };

    // Assert that a value is not an array
    proclaim.isNotArray = function (val, msg) {
        if (isArray(val)) {
            fail(typeof val, 'array', msg, '!==');
        }
    };

    // Assert that a value is a boolean
    proclaim.isBoolean = function (val, msg) {
        proclaim.isTypeOf(val, 'boolean', msg);
    };

    // Assert that a value is not a boolean
    proclaim.isNotBoolean = function (val, msg) {
        proclaim.isNotTypeOf(val, 'boolean', msg);
    };

    // Assert that a value is true
    proclaim.isTrue = function (val, msg) {
        proclaim.strictEqual(val, true, msg);
    };

    // Assert that a value is false
    proclaim.isFalse = function (val, msg) {
        proclaim.strictEqual(val, false, msg);
    };

    // Assert that a value is a function
    proclaim.isFunction = function (val, msg) {
        proclaim.isTypeOf(val, 'function', msg);
    };

    // Assert that a value is not a function
    proclaim.isNotFunction = function (val, msg) {
        proclaim.isNotTypeOf(val, 'function', msg);
    };

    // Assert that a value is null
    proclaim.isNull = function (val, msg) {
        proclaim.strictEqual(val, null, msg);
    };

    // Assert that a value is not null
    proclaim.isNotNull = function (val, msg) {
        proclaim.notStrictEqual(val, null, msg);
    };

    // Assert that a value is a number
    proclaim.isNumber = function (val, msg) {
        proclaim.isTypeOf(val, 'number', msg);
    };

    // Assert that a value is not a number
    proclaim.isNotNumber = function (val, msg) {
        proclaim.isNotTypeOf(val, 'number', msg);
    };

    // Assert that a value is an object
    proclaim.isObject = function (val, msg) {
        proclaim.isTypeOf(val, 'object', msg);
    };

    // Assert that a value is not an object
    proclaim.isNotObject = function (val, msg) {
        proclaim.isNotTypeOf(val, 'object', msg);
    };

    // Assert that a value is a string
    proclaim.isString = function (val, msg) {
        proclaim.isTypeOf(val, 'string', msg);
    };

    // Assert that a value is not a string
    proclaim.isNotString = function (val, msg) {
        proclaim.isNotTypeOf(val, 'string', msg);
    };

    // Assert that a value is undefined
    proclaim.isUndefined = function (val, msg) {
        proclaim.isTypeOf(val, 'undefined', msg);
    };

    // Assert that a value is defined
    proclaim.isDefined = function (val, msg) {
        proclaim.isNotTypeOf(val, 'undefined', msg);
    };

    // Assert that a value matches a regular expression
    proclaim.match = function (actual, expected, msg) {
        if (!expected.test(actual)) {
            fail(actual, expected, msg, 'match');
        }
    };

    // Assert that a value does not match a regular expression
    proclaim.notMatch = function (actual, expected, msg) {
        if (expected.test(actual)) {
            fail(actual, expected, msg, '!match');
        }
    };

    // Assert that an object includes something
    proclaim.include = function (haystack, needle, msg) {
        if (!includes(haystack, needle)) {
            fail(haystack, needle, msg, 'include');
        }
    };

    // Assert that an object does not include something
    proclaim.doesNotInclude = function (haystack, needle, msg) {
        if (includes(haystack, needle)) {
            fail(haystack, needle, msg, '!include');
        }
    };

    // Assert that an object (Array, String, etc.) has the expected length
    proclaim.lengthEquals = function (obj, expected, msg) {
        if (isUndefinedOrNull(obj)) {
            return fail(void 0, expected, msg, 'length');
        }
        if (obj.length !== expected) {
            fail(obj.length, expected, msg, 'length');
        }
    };

    // Assert that a value is less than another value
    proclaim.lessThan = function (actual, expected, msg) {
        if (actual >= expected) {
            fail(actual, expected, msg, '<');
        }
    };

    // Assert that a value is less than or equal to another value
    proclaim.lessThanOrEqual = function (actual, expected, msg) {
        if (actual > expected) {
            fail(actual, expected, msg, '<=');
        }
    };

    // Assert that a value is greater than another value
    proclaim.greaterThan = function (actual, expected, msg) {
        if (actual <= expected) {
            fail(actual, expected, msg, '>');
        }
    };

    // Assert that a value is greater than another value
    proclaim.greaterThanOrEqual = function (actual, expected, msg) {
        if (actual < expected) {
            fail(actual, expected, msg, '>=');
        }
    };


    // Aliases
    // -------

    proclaim.notThrows = proclaim.doesNotThrow;
    proclaim.typeOf = proclaim.isTypeOf;
    proclaim.notTypeOf = proclaim.isNotTypeOf;
    proclaim.instanceOf = proclaim.isInstanceOf;
    proclaim.notInstanceOf = proclaim.isNotInstanceOf;
    proclaim.notInclude = proclaim.doesNotInclude;
    proclaim.lengthOf = proclaim.lengthEquals;
    proclaim.isBelow = proclaim.lessThan;
    proclaim.isAbove = proclaim.greaterThan;


    // Error handling
    // --------------

    // Assertion error class
    function AssertionError (opts) {
        opts = opts || {};
        this.name = 'AssertionError';
        this.actual = opts.actual;
        this.expected = opts.expected;
        this.operator = opts.operator || '';
        this.message = opts.message || getAssertionErrorMessage(this);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, opts.stackStartFunction || fail);
        }
    }
    AssertionError.prototype = (Object.create ? Object.create(Error.prototype) : new Error());
    AssertionError.prototype.name = 'AssertionError';
    AssertionError.prototype.constructor = AssertionError;

    // Assertion error to string
    AssertionError.prototype.toString = function () {
        return this.name + ': ' + this.message;
    };

    // Fail a test
    function fail (actual, expected, message, operator, stackStartFunction) {
        throw new AssertionError({
            message: message,
            actual: actual,
            expected: expected,
            operator: operator,
            stackStartFunction: stackStartFunction
        });
    }

    // Expose error handling tools
    proclaim.AssertionError = AssertionError;
    proclaim.fail = fail;


    // Utilities
    // ---------

    // Utility for checking whether a value is undefined or null
    function isUndefinedOrNull (val) {
        return (val === null || typeof val === 'undefined');
    }

    // Utility for checking whether a value is an arguments object
    function isArgumentsObject (val) {
        return (Object.prototype.toString.call(val) === '[object Arguments]');
    }

    // Utility for checking whether a value is plain object
    function isPlainObject (val) {
        return Object.prototype.toString.call(val) === '[object Object]';
    }

    // Utility for checking whether an object contains another object
    function includes (haystack, needle) {
        /* jshint maxdepth: 3*/
        var i;

        // Array#indexOf, but ie...
        if (isArray(haystack)) {
            for (i = haystack.length - 1; i >= 0; i = i - 1) {
                if (haystack[i] === needle) {
                    return true;
                }
            }
        }

        // String#indexOf
        if (typeof haystack === 'string') {
            if (haystack.indexOf(needle) !== -1) {
                return true;
            }
        }

        // Object#hasOwnProperty
        if (isPlainObject(haystack)) {
            if (haystack.hasOwnProperty(needle)) {
                return true;
            }
        }

        return false;
    }

    // Utility for checking whether a value is an array
    var isArray = Array.isArray || function (val) {
        return (Object.prototype.toString.call(val) === '[object Array]');
    };

    // Utility for getting object keys
    function getObjectKeys (obj) {
        var key;
        var keys = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    // Utility for deep equality testing of objects
    function objectsEqual (obj1, obj2) {
        /* jshint eqeqeq: false */

        // Check for undefined or null
        if (isUndefinedOrNull(obj1) || isUndefinedOrNull(obj2)) {
            return false;
        }

        // Object prototypes must be the same
        if (obj1.prototype !== obj2.prototype) {
            return false;
        }

        // Handle argument objects
        if (isArgumentsObject(obj1)) {
            if (!isArgumentsObject(obj2)) {
                return false;
            }
            obj1 = Array.prototype.slice.call(obj1);
            obj2 = Array.prototype.slice.call(obj2);
        }

        // Check number of own properties
        var obj1Keys = getObjectKeys(obj1);
        var obj2Keys = getObjectKeys(obj2);
        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }

        obj1Keys.sort();
        obj2Keys.sort();

        // Cheap initial key test (see https://github.com/joyent/node/blob/master/lib/assert.js)
        var key;
        var i;
        var len = obj1Keys.length;
        for (i = 0; i < len; i += 1) {
            if (obj1Keys[i] != obj2Keys[i]) {
                return false;
            }
        }

        // Expensive deep test
        for (i = 0; i < len; i += 1) {
            key = obj1Keys[i];
            if (!isDeepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        // If it got this far...
        return true;
    }

    // Utility for deep equality testing
    function isDeepEqual (actual, expected) {
        /* jshint eqeqeq: false */
        if (actual === expected) {
            return true;
        }
        if (expected instanceof Date && actual instanceof Date) {
            return actual.getTime() === expected.getTime();
        }
        if (actual instanceof RegExp && expected instanceof RegExp) {
            return (
                actual.source === expected.source &&
                actual.global === expected.global &&
                actual.multiline === expected.multiline &&
                actual.lastIndex === expected.lastIndex &&
                actual.ignoreCase === expected.ignoreCase
            );
        }
        if (typeof actual !== 'object' && typeof expected !== 'object') {
            return actual == expected;
        }
        return objectsEqual(actual, expected);
    }

    // Utility for testing whether a function throws an error
    function functionThrows (fn, expected) {

        // Try/catch
        var thrown = false;
        var thrownError;
        try {
            fn();
        }
        catch (err) {
            thrown = true;
            thrownError = err;
        }

        // Check error
        if (thrown && expected) {
            thrown = errorMatches(thrownError, expected);
        }

        return thrown;
    }

    // Utility for checking whether an error matches a given constructor, regexp or string
    function errorMatches (actual, expected) {
        if (typeof expected === 'string') {
            return actual.message === expected;
        }
        if (expected instanceof RegExp) {
            return expected.test(actual.message);
        }
        if (actual instanceof expected) {
            return true;
        }
        return false;
    }

    // Get a formatted assertion error message
    function getAssertionErrorMessage (error) {
        if (typeof require === 'function') {
            var util = require('util');
            return [
                truncateString(util.inspect(error.actual, {depth: null}), 128),
                error.operator,
                truncateString(util.inspect(error.expected, {depth: null}), 128)
            ].join(' ');
        }
        else {
            return error.actual + ' ' + error.operator + ' ' + error.expected;
        }
    }

    // Truncate a string to a length
    function truncateString (string, length) {
        return (string.length < length ? string : string.slice(0, length) + '…');
    }


    // Exports
    // -------

    // AMD
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return proclaim;
        });
    }
    // CommonJS
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = proclaim;
    }
    // Script tag
    root.proclaim = proclaim;
    if (typeof global !== 'undefined') {
        global.proclaim = proclaim;
    }

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util":5}],7:[function(require,module,exports){
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

},{"../../../lib/varname":1,"proclaim":6}]},{},[7]);

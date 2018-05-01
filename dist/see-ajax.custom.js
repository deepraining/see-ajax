/*!
 * 
 *     see-ajax v0.2.2
 * 
 *     https://github.com/senntyou/see-ajax
 * 
 *     @senntyou <jiangjinbelief@163.com>
 * 
 *     2018-05-01 15:55:33
 *     
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("json-refactor"));
	else if(typeof define === 'function' && define.amd)
		define(["json-refactor"], factory);
	else if(typeof exports === 'object')
		exports["seeAjax"] = factory(require("json-refactor"));
	else
		root["seeAjax"] = factory(root["JSONRefactor"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = {
    // application options
    options: {},
    // environment, default is 0
    env: 0
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    // custom request function
    request: void 0,
    // custom extend function
    extend: void 0
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var prefix = 'see-ajax: ';

module.exports = {
    log: function log(str) {
        console.log(prefix + str);
    },
    info: function info(str) {
        console.info(prefix + str);
    },
    warn: function warn(str) {
        console.warn(prefix + str);
    },
    error: function error(str) {
        console.error(prefix + str);
    },
    throwError: function throwError(str) {
        throw new Error(prefix + str);
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var extend = __webpack_require__(4);
var config = __webpack_require__(5);
var setEnv = __webpack_require__(6);
var getEnv = __webpack_require__(7);
var send = __webpack_require__(8);
var set = __webpack_require__(11);

set({
    extend: extend
});

var seeAjax = send;

seeAjax.config = config;
seeAjax.setEnv = setEnv;
seeAjax.getEnv = getEnv;
seeAjax.set = set;

module.exports = seeAjax;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && typeof target !== 'function') {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);

/**
 * config application
 *
 * @param name
 * @param option
 */
module.exports = function (name, option) {
    // one
    if (typeof name == 'string') {
        data.options[name] = option;
    }
    // multi
    else {
            for (var attr in name) {
                if (name.hasOwnProperty(attr)) data.options[attr] = name[attr];
            }
        }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);

/**
 * set current environment
 */
module.exports = function (env) {
  data.env = env;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);

/**
 * get current environment
 *
 * @returns {Object.<string, *>|null|*|number}
 */
module.exports = function () {
  return data.env;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var setting = __webpack_require__(1);
var data = __webpack_require__(0);
var logger = __webpack_require__(2);
var postHandle = __webpack_require__(9);

/**
 * send a request
 *
 * @param name Defined request name
 * @param reqData Request data
 * @param successCallback Success callback
 * @param errorCallback Error callback
 */
module.exports = function (name, reqData, successCallback, errorCallback) {
    if (!name) {
        logger.throwError('name \'' + name + '\' is not defined.');
        return;
    }

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    if (!option) {
        logger.throwError('name \'' + name + '\' is not configured.');
        return;
    }

    // index to select item
    var index = data.env;

    // http method, default is GET
    var method = option.method && option.method[index] || 'get';
    // stringify request data
    var stringify = option.stringify && option.stringify[index] || !1;
    // ajax settings
    var settings = option.settings && option.settings[index] || {};
    // url
    var url = option.url && option.url[index] || '';
    // request keys
    var requestKeys = option.requestKeys && option.requestKeys[index] || {};
    // pre handle
    var preHandle = option.preHandle && option.preHandle[index];
    var commonPreHandle = commonOption.preHandle && commonOption.preHandle[index];
    // implement
    var implement = option.implement && option.implement[index];

    // ultimate request data after requestKeys mapping
    var ultimateReqData = setting.extend(!0, {}, reqData);
    for (var ultimateReqDataAttr in ultimateReqData) {
        if (ultimateReqData.hasOwnProperty(ultimateReqDataAttr) && requestKeys[ultimateReqDataAttr]) {
            // make a new key
            ultimateReqData[requestKeys[ultimateReqDataAttr]] = ultimateReqData[ultimateReqDataAttr];
            // delete old key
            delete ultimateReqData[ultimateReqDataAttr];
        }
    }

    // pre handle
    commonPreHandle && commonPreHandle(ultimateReqData);
    preHandle && preHandle(ultimateReqData);

    // custom implement
    if (implement) {
        logger.info('Custom implement ajax for "' + name + '", and request data is: ' + JSON.stringify(ultimateReqData));

        var result = implement(!stringify ? ultimateReqData : JSON.stringify(ultimateReqData));

        logger.info('result for "' + name + '" is: ' + JSON.stringify(result));

        // post handle
        postHandle(result, ultimateReqData, name);
        successCallback(result);
    } else {
        settings.url = url;
        settings.method = method;
        // if get method, do not stringify
        settings.data = stringify && method != 'get' ? JSON.stringify(ultimateReqData) : ultimateReqData;

        // default dataType: json
        !settings.dataType && (settings.dataType = 'json');
        settings.success = function (res, textStatus, jqXHR) {
            // post handle
            postHandle(res, ultimateReqData, name);

            successCallback && successCallback(res, textStatus, jqXHR);
        };
        settings.error = function (jqXHR, textStatus, errorThrown) {
            errorCallback && errorCallback(jqXHR, textStatus, errorThrown);
        };

        if (!setting.request) logger.throwError('`setting.request` is not configured');

        setting.request(settings);
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var JSONRefactor = __webpack_require__(10);

var data = __webpack_require__(0);
var logger = __webpack_require__(2);

/**
 * post handle after get response data
 *
 * @param res Response data
 * @param reqData Request data
 * @param name Name
 */
module.exports = function (res, reqData, name) {

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    // index to select item
    var index = data.env;

    // response refactor
    var responseRefactor = option.responseRefactor && option.responseRefactor[index];
    var commonResponseRefactor = commonOption.responseRefactor && commonOption.responseRefactor[index];

    // post handle
    var postHandle = option.postHandle && option.postHandle[index];
    var commonPostHandle = commonOption.postHandle && commonOption.postHandle[index];

    commonResponseRefactor && JSONRefactor(res, commonResponseRefactor);
    responseRefactor && JSONRefactor(res, responseRefactor);
    commonPostHandle && commonPostHandle(res, reqData, name);
    postHandle && postHandle(res, reqData, name);
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setting = __webpack_require__(1);

module.exports = function (paramSetting) {
    for (var attr in paramSetting) {
        if (paramSetting.hasOwnProperty(attr) && typeof paramSetting[attr] !== 'undefined') {
            setting[attr] = paramSetting[attr];
        }
    }
};

/***/ })
/******/ ]);
});
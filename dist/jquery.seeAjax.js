/*!
 * 
 *     jquery.seeAjax v0.1.0
 * 
 *     https://github.com/senntyou/jquery.seeAjax
 * 
 *     @senntyou <jiangjinbelief@163.com>
 * 
 *     2017-12-25 11:22:10
 *     
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("json-refactor"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "json-refactor"], factory);
	else if(typeof exports === 'object')
		exports["seeAjax"] = factory(require("jquery"), require("json-refactor"));
	else
		root["seeAjax"] = factory(root["jQuery"], root["jsonRefactor"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_12__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = {
    option: {
        // default environment is 0
        env: 0
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var prefix = 'jquery.seeAjax: ';

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
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var send = __webpack_require__(4);

/**
 * METHOD POST, PUT, DELETE, ...
 *
 * @param method
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param stringify
 * @param extraOptions
 */
module.exports = function (method, urlName, reqData, callback, type, stringify, extraOptions) {
    if (typeof type == 'boolean') {
        /**
         * (method, urlName, reqData, callback, stringify, extraOptions)
         */
        if ((typeof stringify === 'undefined' ? 'undefined' : _typeof(stringify)) == 'object') {
            extraOptions = stringify;
            stringify = type;
            type = void 0;
        }
        /**
         * (method, urlName, reqData, callback, stringify)
         */
        else {
                stringify = type;
                type = void 0;
            }
    }
    /**
     * (method, urlName, reqData, callback, extraOptions)
     */
    else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object') {
            extraOptions = type;
            type = void 0;
            stringify = void 0;
        }
    send(method, urlName, reqData, callback, type, stringify, extraOptions);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var $ = __webpack_require__(2);

var data = __webpack_require__(0);
var logger = __webpack_require__(1);
var getReqInfo = __webpack_require__(9);
var preHandle = __webpack_require__(10);
var postHandle = __webpack_require__(11);

/**
 * send a request
 *
 * @param method Request Method, like GET, POST, PUT, DELETE, OPTION
 * @param urlName Request url name
 * @param reqData Request data
 * @param callback Success callback
 * @param type Response data type
 * @param stringify Whether stringify request data
 * @param extraOption Extra jquery ajax option
 */
module.exports = function (method, urlName, reqData, callback, type, stringify, extraOption) {

    /**
     * real name, commonly is the same as urlName
     */
    var name = data.option.name[urlName];

    /**
     * current environment index
     * @type {Object.<string, *>|null|*}
     */
    var index = data.option.env;

    if (!name) {
        logger.throwError('name \'' + urlName + '\' is not defined.');
        return;
    }

    /**
     * request info
     * @type {{url, reqData}|{}|*}
     */
    var reqInfo = getReqInfo(urlName, reqData);

    /**
     * real request data
     */
    var realReqData = reqInfo.reqData;

    /**
     * default response doc type
     */
    !type && (type = 'json');

    /**
     * pre handle
     */
    preHandle(realReqData, urlName);

    /**
     * custom ajax implement function
     *
     * @type {string|Array|implement|{implement}|*}
     */
    var implement = data.option.implement && data.option.implement[name];
    if (implement instanceof Array) implement = implement[index];

    // custom implement
    if (implement) {
        logger.info('Custom implement ajax for "' + urlName + '", and request data is: ');
        logger.info(JSON.stringify(realReqData));

        var result = implement(!stringify ? realReqData : JSON.stringify(realReqData));

        logger.info('result for "' + urlName + '" is: ');
        logger.info(JSON.stringify(result));

        postHandle(result, realReqData, urlName);
        callback(result);
    } else {
        var options = extraOption || {};
        options.type = method;
        options.data = !stringify ? realReqData : JSON.stringify(realReqData);
        options.dataType = type;
        options.success = function (res) {
            /**
             * post handle
             */
            postHandle(res, realReqData, urlName);
            callback(res);
        };
        $.ajax(reqInfo.url, options);
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var $ = __webpack_require__(2);

var config = __webpack_require__(6);
var getEnv = __webpack_require__(7);
var getMethod = __webpack_require__(8);
var postMethod = __webpack_require__(13);
var putMethod = __webpack_require__(14);
var deleteMethod = __webpack_require__(15);

var request = {
    config: config,
    getEnv: getEnv,
    get: getMethod,
    post: postMethod,
    put: putMethod,
    delete: deleteMethod
};

$.seeAjax = request;

module.exports = request;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var $ = __webpack_require__(2);

var data = __webpack_require__(0);

/**
 * config application
 *
 * @param option
 */
module.exports = function (option) {
  $.extend(true, data.option, option);
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
  return data.option.env;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var send = __webpack_require__(4);

/**
 * METHOD get
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param extraOptions
 */
module.exports = function (urlName, reqData, callback, type, extraOptions) {
    /**
     * (urlName, reqData, callback, extraOptions)
     */
    if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) == 'object') {
        extraOptions = type;
        type = void 0;
    }

    send('get', urlName, reqData, callback, type, !1, extraOptions);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);
var logger = __webpack_require__(1);

/**
 * get normalized request data
 *
 * @param urlName Url name
 * @param reqData Request data
 * @returns {{}}
 */
module.exports = function (urlName, reqData) {
    /**
     * real name, commonly is the same as urlName
     */
    var name = data.option.name[urlName];

    /**
     * current environment index
     * @type {Object.<string, *>|null|*}
     */
    var index = data.option.env;
    /**
     *
     * @type {{}}
     */
    var normalizedReqData = {};

    if (reqData instanceof Array) reqData.forEach(function (item, idx) {
        normalizedReqData[data.option.requestKeys[name][index][idx]] = item;
    });else Object.keys(reqData).forEach(function (key) {
        normalizedReqData[data.option.requestKeys[name][index][key]] = reqData[key];
    });

    return {
        url: data.option.url[name][index],
        reqData: normalizedReqData
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var data = __webpack_require__(0);
var logger = __webpack_require__(1);

/**
 * pre handle request data
 *
 * @param reqData
 * @param urlName
 */
module.exports = function (reqData, urlName) {

  /**
   * real name, commonly is the same as urlName
   */
  var name = data.option.name[urlName];

  /**
   * current environment index
   * @type {Object.<string, *>|null|*}
   */
  var index = data.option.env;

  /**
   * common handler
   *
   * @type {preHandle|{common, test, implement}|{common, test2}|Array}
   */
  var commonHandle = data.option.preHandle && data.option.preHandle.common;
  /**
   * named handler
   *
   * @type {preHandle|{common, test, implement}|{common, test2}|*}
   */
  var namedHandle = data.option.preHandle && data.option.preHandle[name];

  if (commonHandle instanceof Array) commonHandle = commonHandle[index];
  if (namedHandle instanceof Array) namedHandle = namedHandle[index];

  typeof commonHandle == 'function' && commonHandle(reqData);
  typeof namedHandle == 'function' && namedHandle(reqData);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var jsonRefactor = __webpack_require__(12);

var data = __webpack_require__(0);
var logger = __webpack_require__(1);

/**
 * post handle after get response data
 *
 * @param res Response data
 * @param reqData Request data
 * @param urlName Url name
 */
module.exports = function (res, reqData, urlName) {

  /**
   * real name, commonly is the same as urlName
   */
  var name = data.option.name[urlName];

  /**
   * current environment index
   * @type {Object.<string, *>|null|*}
   */
  var index = data.option.env;

  /**
   * common refactor
   *
   * @type {responseRefactor|{common, test, implement}|{common, test2}|Array}
   */
  var commonRefactor = data.option.responseRefactor && data.option.responseRefactor.common;
  /**
   * named refactor
   *
   * @type {responseRefactor|{common, test, implement}|{common, test2}|*}
   */
  var namedRefactor = data.option.responseRefactor && data.option.responseRefactor[name];

  /**
   * common handler
   *
   * @type {postHandle|{common, test, implement}|{common, test2}|Array}
   */
  var commonHandle = data.option.postHandle && data.option.postHandle.common;
  /**
   * named handler
   *
   * @type {postHandle|{common, test, implement}|{common, test2}|*}
   */
  var namedHandle = data.option.postHandle && data.option.postHandle[name];

  if (commonRefactor instanceof Array) commonRefactor = commonRefactor[index];
  if (namedRefactor instanceof Array) namedRefactor = namedRefactor[index];
  if (commonHandle instanceof Array) commonHandle = commonHandle[index];
  if (namedHandle instanceof Array) namedHandle = namedHandle[index];

  commonRefactor && (typeof commonRefactor === 'undefined' ? 'undefined' : _typeof(commonRefactor)) == 'object' && jsonRefactor(res, commonRefactor);
  namedRefactor && (typeof namedRefactor === 'undefined' ? 'undefined' : _typeof(namedRefactor)) == 'object' && jsonRefactor(res, namedRefactor);
  typeof commonHandle == 'function' && commonHandle(res, reqData, urlName);
  typeof namedHandle == 'function' && namedHandle(res, reqData, urlName);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var beyondGet = __webpack_require__(3);

/**
 * METHOD post
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param stringify
 * @param extraOptions
 */
module.exports = function (urlName, reqData, callback, type, stringify, extraOptions) {
  beyondGet('post', urlName, reqData, callback, type, stringify, extraOptions);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var beyondGet = __webpack_require__(3);

/**
 * METHOD put
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param stringify
 * @param extraOptions
 */
module.exports = function (urlName, reqData, callback, type, stringify, extraOptions) {
  beyondGet('put', urlName, reqData, callback, type, stringify, extraOptions);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var beyondGet = __webpack_require__(3);

/**
 * METHOD delete
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param stringify
 * @param extraOptions
 */
module.exports = function (urlName, reqData, callback, type, stringify, extraOptions) {
  beyondGet('delete', urlName, reqData, callback, type, stringify, extraOptions);
};

/***/ })
/******/ ]);
});
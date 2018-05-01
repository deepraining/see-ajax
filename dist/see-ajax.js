/*!
 * 
 *     see-ajax v0.2.2
 * 
 *     https://github.com/senntyou/see-ajax
 * 
 *     @senntyou <jiangjinbelief@163.com>
 * 
 *     2018-05-01 13:56:57
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
		root["seeAjax"] = factory(root["jQuery"], root["JSONRefactor"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var config = __webpack_require__(3);
var setEnv = __webpack_require__(4);
var getEnv = __webpack_require__(5);
var send = __webpack_require__(6);

var seeAjax = send;

seeAjax.config = config;
seeAjax.setEnv = setEnv;
seeAjax.getEnv = getEnv;

module.exports = seeAjax;

/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var $ = __webpack_require__(7);

var data = __webpack_require__(0);
var logger = __webpack_require__(1);
var postHandle = __webpack_require__(8);

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
    var ultimateReqData = $.extend(!0, {}, reqData);
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
        logger.info('Custom implement ajax for "' + name + '", and request data is: ');
        logger.info(JSON.stringify(ultimateReqData));

        var result = implement(!stringify ? ultimateReqData : JSON.stringify(ultimateReqData));

        logger.info('result for "' + name + '" is: ');
        logger.info(JSON.stringify(result));

        // post handle
        postHandle(result, ultimateReqData, name);
        successCallback(result);
    } else {
        settings.type = method;
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
        $.ajax(url, settings);
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var JSONRefactor = __webpack_require__(9);

var data = __webpack_require__(0);
var logger = __webpack_require__(1);

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
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ })
/******/ ]);
});
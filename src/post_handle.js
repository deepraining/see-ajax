
'use strict';

var JSONRefactor = require('json-refactor');

var data = require('./data');
var logger = require('./util/logger');

/**
 * post handle after get response data
 *
 * @param res Response data
 * @param reqData Request data
 * @param urlName Url name
 */
module.exports = (res, reqData, urlName) => {

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

    commonRefactor && typeof commonRefactor == 'object' && JSONRefactor(res, commonRefactor);
    namedRefactor && typeof namedRefactor == 'object' && JSONRefactor(res, namedRefactor);
    typeof commonHandle == 'function' && commonHandle(res, reqData, urlName);
    typeof namedHandle == 'function' && namedHandle(res, reqData, urlName);
};

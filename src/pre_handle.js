
'use strict';

var data = require('./data');
var logger = require('./util/logger');

/**
 * pre handle request data
 *
 * @param reqData
 * @param urlName
 */
module.exports = (reqData, urlName) => {

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

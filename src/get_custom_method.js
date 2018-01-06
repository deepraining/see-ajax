
'use strict';

var data = require('./data');
var logger = require('./util/logger');

/**
 * get normalized request data
 *
 * @param urlName Url name
 */
module.exports = (urlName) => {
    /**
     * custom methods
     */
    var method = data.option.method && data.option.method[urlName];

    /**
     * current environment index
     * @type {Object.<string, *>|null|*}
     */
    var index = data.option.env;

    if (method instanceof Array) method = method[index];

    method && (method = method.toLowerCase());

    return method;
};

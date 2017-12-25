
'use strict';

var beyondGet = require('./beyond_get');

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
module.exports = (urlName, reqData, callback, type, stringify, extraOptions) => {
    beyondGet('post', urlName, reqData, callback, type, stringify, extraOptions);
};

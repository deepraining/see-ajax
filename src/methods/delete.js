
'use strict';

var beyondGet = require('./beyond_get');

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
module.exports = (urlName, reqData, callback, type, stringify, extraOptions) => {
    beyondGet('delete', urlName, reqData, callback, type, stringify, extraOptions);
};

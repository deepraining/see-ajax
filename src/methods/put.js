
'use strict';

var beyondGet = require('./beyond_get');

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
module.exports = (urlName, reqData, callback, type, stringify, extraOptions) => {
    beyondGet('put', urlName, reqData, callback, type, stringify, extraOptions);
};

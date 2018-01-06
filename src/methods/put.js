
'use strict';

var send = require('../send');

/**
 * METHOD put
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param stringify
 * @param extraOptions
 */
module.exports = (urlName, reqData, callback, stringify, extraOptions) => {
    send('put', urlName, reqData, callback, stringify, extraOptions);
};

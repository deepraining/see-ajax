
'use strict';

var send = require('../send');

/**
 * METHOD get
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param stringify
 * @param extraOptions
 */
module.exports = (urlName, reqData, callback, stringify, extraOptions) => {
    send('get', urlName, reqData, callback, stringify, extraOptions);
};

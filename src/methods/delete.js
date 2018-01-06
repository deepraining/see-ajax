
'use strict';

var send = require('../send');

/**
 * METHOD delete
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param stringify
 * @param extraOptions
 */
module.exports = (urlName, reqData, callback, stringify, extraOptions) => {
    send('delete', urlName, reqData, callback, stringify, extraOptions);
};

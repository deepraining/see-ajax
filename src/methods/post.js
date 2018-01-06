
'use strict';

var send = require('../send');

/**
 * METHOD post
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param stringify
 * @param extraOptions
 */
module.exports = (urlName, reqData, callback, stringify, extraOptions) => {
    send('post', urlName, reqData, callback, stringify, extraOptions);
};

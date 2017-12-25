
'use strict';

var send = require('../send');

/**
 * METHOD get
 *
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param extraOptions
 */
module.exports = (urlName, reqData, callback, type, extraOptions) => {
    /**
     * (urlName, reqData, callback, extraOptions)
     */
    if (typeof type == 'object'){
        extraOptions = type;
        type = void 0;
    }

    send('get', urlName, reqData, callback, type, !1, extraOptions);
};

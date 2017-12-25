
'use strict';

var send = require('../send');

/**
 * METHOD POST, PUT, DELETE, ...
 *
 * @param method
 * @param urlName
 * @param reqData
 * @param callback
 * @param type
 * @param stringify
 * @param extraOptions
 */
module.exports = (method, urlName, reqData, callback, type, stringify, extraOptions) => {
    if (typeof type == 'boolean') {
        /**
         * (method, urlName, reqData, callback, stringify, extraOptions)
         */
        if (typeof stringify == 'object') {
            extraOptions = stringify;
            stringify = type;
            type = void 0;
        }
        /**
         * (method, urlName, reqData, callback, stringify)
         */
        else {
            stringify = type;
            type = void 0;
        }
    }
    /**
     * (method, urlName, reqData, callback, extraOptions)
     */
    else if (typeof type == 'object') {
        extraOptions = type;
        type = void 0;
        stringify = void 0;
    }
    send(method, urlName, reqData, callback, type, stringify, extraOptions);
};

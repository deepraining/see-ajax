
'use strict';

var data = require('./data');
var logger = require('./util/logger');

/**
 * get normalized request data
 *
 * @param urlName Url name
 * @param reqData Request data
 * @returns {{}}
 */
module.exports = (urlName, reqData) => {
    /**
     * real name, commonly is the same as urlName
     */
    var name = data.option.name[urlName];
    
    if (!name) {
        logger.throwError(`name '${urlName}' is not defined.`);
    }

    /**
     * current environment index
     * @type {Object.<string, *>|null|*}
     */
    var index = data.option.env;
    /**
     *
     * @type {{}}
     */
    var normalizedReqData = {};

    if (reqData instanceof Array)
        reqData.forEach((item, idx) => {
            normalizedReqData[data.option.requestKeys[name][index][idx]] = item;
        });
    else
        Object.keys(reqData).forEach((key) => {
            normalizedReqData[data.option.requestKeys[name][index][key]] = reqData[key]
        });

    return {
        url: data.option.url[name][index],
        reqData: normalizedReqData
    };
};

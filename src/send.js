
'use strict';

var setting = require('./setting');
var data = require('./data');
var logger = require('./util/logger');
var postHandle = require('./post_handle');


let implementSend = (name, result, ultimateReqData, successCallback) => {
    if (setting.debug) {
        logger.info(`Custom implement ajax for "${name}", and request data is:`);
        console.log(ultimateReqData);
        logger.info(`result for "${name}" is:`);
        console.log(result);
    }

    // post handle
    postHandle(result, ultimateReqData, name);

    successCallback(result);
};

/**
 * send a request
 *
 * @param name Defined request name
 * @param reqData Request data
 * @param successCallback Success callback
 * @param errorCallback Error callback
 */
module.exports = (name, reqData, successCallback, errorCallback) => {
    if (!name) {
        logger.throwError(`name '${name}' is not defined.`);
        return;
    }

    // current option
    var option = data.options[name];
    // common option
    var commonOption = data.options['common'] || {};

    if (!option) {
        logger.throwError(`name '${name}' is not configured.`);
        return;
    }

    // index to select item
    var index = data.env;

    // http method, default is GET
    var method = option.method && option.method[index] || 'get';
    // stringify request data
    var stringify = option.stringify && option.stringify[index] || !1;
    // ajax settings
    var settings = option.settings && option.settings[index] || {};
    // url
    var url = option.url && option.url[index] || '';
    // request keys
    var requestKeys = option.requestKeys && option.requestKeys[index] || {};
    // pre handle
    var preHandle = option.preHandle && option.preHandle[index];
    var commonPreHandle = commonOption.preHandle && commonOption.preHandle[index];
    // implement
    var implement = option.implement && option.implement[index];

    // ultimate request data after requestKeys mapping
    var ultimateReqData = setting.extend(!0, {}, reqData);
    for (var ultimateReqDataAttr in ultimateReqData) {
        if (ultimateReqData.hasOwnProperty(ultimateReqDataAttr) && requestKeys[ultimateReqDataAttr]) {
            // make a new key
            ultimateReqData[requestKeys[ultimateReqDataAttr]] = ultimateReqData[ultimateReqDataAttr];
            // delete old key
            delete ultimateReqData[ultimateReqDataAttr];
        }
    }

    // pre handle
    commonPreHandle && commonPreHandle(ultimateReqData);
    preHandle && preHandle(ultimateReqData);

    // custom implement
    if (implement) {

        var result = implement(!stringify ? ultimateReqData : JSON.stringify(ultimateReqData));

        // implement
        let implementDelay = option.implementDelay && option.implementDelay[index];

        if (typeof implementDelay === 'number' && implementDelay > 0)
            setTimeout(_ => {
                implementSend(name, result, ultimateReqData, successCallback);
            }, implementDelay);
        else
            implementSend(name, result, ultimateReqData, successCallback);
    }
    else {
        settings.url = url;
        settings.method = method;
        // if get method, do not stringify
        settings.data = stringify && method != 'get' ? JSON.stringify(ultimateReqData) : ultimateReqData;

        // default dataType: json
        !settings.dataType && (settings.dataType = 'json');
        settings.success = (res, textStatus, jqXHR) => {
            // post handle
            postHandle(res, ultimateReqData, name);

            successCallback && successCallback(res, textStatus, jqXHR);
        };
        settings.error = (jqXHR, textStatus, errorThrown) => {
            errorCallback && errorCallback(jqXHR, textStatus, errorThrown);
        };

        if (!setting.request) logger.throwError('`setting.request` is not configured');

        setting.request(settings);
    }
};

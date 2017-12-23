
'use strict';

var getReqInfo = require('./get_req_info');

/**
 * send a request
 *
 * @param method Request Method, like GET, POST, PUT, DELETE, OPTION
 * @param url Request url
 * @param reqData Request data
 * @param callback Success callback
 * @param type Response data type
 * @param stringify Whether stringify request data
 * @param extraOption Extra jquery ajax option
 */
module.exports = (method, url, reqData, callback, type, stringify, extraOption) => {
    var reqInfo = getReqInfo(url, reqData);
    !type && (type = 'json');
    //前置处理
    request.preHandle(reqInfo[1], url);

    var name = data.option.name[url],
        index = data.option.env,
        realize;
    typeof index == 'undefined' && (console.info("环境变量 data.option.env 没有配置, 默认取值为0的环境"), index = 0);
    !name ? console.error("data.option.url中无 " + url + " 对应的值") : (
        data.option.realize && data.option.realize[name] && (
            realize = typeof data.option.realize[name] == 'function' ? typeof data.option.realize[name] :
                (!!data.option.realize[name][index] ? data.option.realize[name][index] : void 0)
        )
    );

    if (!realize) {
        var options = extraOption || {};
        options.type = method;
        options.data = !stringify ? reqInfo[1] : JSON.stringify(reqInfo[1]);
        options.dataType = type;
        options.success = function (res) {
            //后置处理
            request.postHandle(res, options.data, url);
            callback(res);
        };
        $.ajax(reqInfo[0], options);
    }
    else {
        var requestData = !stringify ? reqInfo[1] : JSON.stringify(reqInfo[1]);

        console.info('Custom realize function for "' + url + '", and request data is: ');
        console.info(requestData);

        var result = realize(requestData);

        console.info('result is: ');
        console.info(result);

        //后置处理
        request.postHandle(result, req, url);
        callback(result);
    }
};

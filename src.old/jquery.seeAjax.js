if (typeof jQuery === 'undefined') {
    throw new Error('jquery.seeAjax requires jQuery')
}

(function($) {

    var config = {};//配置
    var request = {};//请求

    /**
     * 预处理请求数据
     * @param data json: 请求数据
     * @param url int/string
     */
    request.preHandle = function (data, url) {
        var name = data.option.name[url],
            index = data.option.env,
            commonHandle = !!data.option.preHandle && !!data.option.preHandle.common && data.option.preHandle.common,
            nameHandle = !!data.option.preHandle && !!data.option.preHandle[name] && data.option.preHandle[name];
        typeof index == 'undefined' && (
            console.info("环境变量 data.option.env 没有配置, 默认取值为0的环境"),
                index = 0
        );
        !!commonHandle && (
            typeof commonHandle == 'function' ? (
                //是函数
                !index && commonHandle(data)
            ) : (
                //数组
                !!commonHandle[index] && commonHandle[index](data)
            )
        );
        !!nameHandle && (
            typeof nameHandle == 'function' ? (
                //是函数
                !index && nameHandle(data)
            ) : (
                //数组
                !!nameHandle[index] && nameHandle[index](data)
            )
        );
    };

    /**
     * 后置处理返回的数据
     * @param res json: 请求数据
     * @param req 请求的参数
     * @param url int/string
     */
    request.postHandle = function (res, req, url) {
        var name = data.option.name[url],
            index = data.option.env,
            commonHandle = !!data.option.postHandle && !!data.option.postHandle.common && data.option.postHandle.common,
            nameHandle = !!data.option.postHandle && !!data.option.postHandle[name] && data.option.postHandle[name],
            commonRefactor = !!data.option.responseRefactor && !!data.option.responseRefactor.common && data.option.responseRefactor.common,
            nameRefactor = !!data.option.responseRefactor && !!data.option.responseRefactor[name] && data.option.responseRefactor[name];
        typeof index == 'undefined' && (
            console.info("环境变量 data.option.env 没有配置, 默认取值为0的环境"),
                index = 0
        );
        !!commonRefactor && (
            !Array.isArray(commonRefactor) ? (
                //是对象
                !index && JSON.refactor(res, commonRefactor)
            ) : (
                //数组
                !!commonRefactor[index] && JSON.refactor(res, commonRefactor[index])
            )
        );
        !!nameRefactor && (
            !Array.isArray(nameRefactor) ? (
                //是对象
                !index && JSON.refactor(res, nameRefactor)
            ) : (
                //数组
                !!nameRefactor[index] && JSON.refactor(res, nameRefactor[index])
            )
        );
        !!commonHandle && (
            typeof commonHandle == 'function' ? (
                //是函数
                !index && commonHandle(res, req)
            ) : (
                //数组
                !!commonHandle[index] && commonHandle[index](res, req)
            )
        );
        !!nameHandle && (
            typeof nameHandle == 'function' ? (
                //是函数
                !index && nameHandle(res, req)
            ) : (
                //数组
                !!nameHandle[index] && nameHandle[index](res, req)
            )
        );
    };

    /**
     * 发起get请求
     * @param url
     * @param data
     * @param callback
     * @param type
     * @param extraOptions
     */
    request.get = function (url, data, callback, type, extraOptions) {

        if (typeof type == 'object'){
            extraOptions = type;
            type = void 0;
        }

        request.send("get", url, data, callback, type, !1, extraOptions);
    };
    /**
     * get 方法之外的其他请求
     * @param method
     * @param url
     * @param data
     * @param callback
     * @param type
     * @param stringify
     * @param extraOptions
     */
    request.beyondGet = function (method, url, data, callback, type, stringify, extraOptions) {
        if (typeof type == 'boolean') {
            if (typeof stringify == 'object') {
                extraOptions = stringify;
                stringify = type;
                type = void 0;
            }
            else {
                stringify = type;
                type = void 0;
            }
        }
        else if (typeof type == 'object') {
            extraOptions = type;
            type = void 0;
            stringify = void 0;
        }
        request.send(method, url, data, callback, type, stringify, extraOptions);
    };
    /**
     * 发起post请求
     * @param url
     * @param data
     * @param callback
     * @param type
     * @param stringify
     * @param extraOptions
     */
    request.post = function (url, data, callback, type, stringify, extraOptions) {
        request.beyondGet('post', url, data, callback, type, stringify, extraOptions);
    };
    /**
     * 发起put请求
     * @param url
     * @param data
     * @param callback
     * @param type
     * @param stringify
     * @param extraOptions
     */
    request.put = function (url, data, callback, type, stringify, extraOptions) {
        request.beyondGet('put', url, data, callback, type, stringify, extraOptions);
    };
    /**
     * 发起delete请求
     * @param url
     * @param data
     * @param callback
     * @param type
     * @param stringify
     * @param extraOptions
     */
    request.delete = function (url, data, callback, type, stringify, extraOptions) {
        request.beyondGet('delete', url, data, callback, type, stringify, extraOptions);
    };

    $.seeAjax = request;

})(jQuery);
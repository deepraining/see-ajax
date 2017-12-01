if (typeof jQuery === 'undefined') {
    throw new Error('jquery.seeAjax requires jQuery')
}

(function($) {

    var initialized = !1; // 是否初始化过
    var config = {};//配置
    var request = {};//请求

    /**
     * 格式化请求数据
     * @param url int/string
     * @param data []/{}
     * @returns {*[]}
     */
    request.getFormatData = function (url, data) {
        var name = config.name[url],
            index = config.environment,
            newData = {};
        typeof index == 'undefined' && (
            console.info("环境变量 config.environment 没有配置, 默认取值为0的环境"),
                index = 0
        );
        !name && (
            console.error("config.url中无 " + url + " 对应的值")
        );
        Array.isArray(data) ? (
            data.map(function (item, idx) {
                newData[config.requestKeys[name][index][idx]] = item
            })
        ) : (
            Object.keys(data).map(function (item) {
                newData[config.requestKeys[name][index][item]] = data[item]
            })
        );
        return [
            config.url[name][index],
            newData
        ];
    };

    /**
     * 预处理请求数据
     * @param data json: 请求数据
     * @param url int/string
     */
    request.preHandle = function (data, url) {
        var name = config.name[url],
            index = config.environment,
            commonHandle = !!config.preHandle && !!config.preHandle.common && config.preHandle.common,
            nameHandle = !!config.preHandle && !!config.preHandle[name] && config.preHandle[name];
        typeof index == 'undefined' && (
            console.info("环境变量 config.environment 没有配置, 默认取值为0的环境"),
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
        var name = config.name[url],
            index = config.environment,
            commonHandle = !!config.postHandle && !!config.postHandle.common && config.postHandle.common,
            nameHandle = !!config.postHandle && !!config.postHandle[name] && config.postHandle[name],
            commonRefactor = !!config.responseRefactor && !!config.responseRefactor.common && config.responseRefactor.common,
            nameRefactor = !!config.responseRefactor && !!config.responseRefactor[name] && config.responseRefactor[name];
        typeof index == 'undefined' && (
            console.info("环境变量 config.environment 没有配置, 默认取值为0的环境"),
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
     * 发起请求
     * @param method 请求方法
     * @param url 请求地址
     * @param data 请求json数据
     * @param callback 请求回调
     * @param type 请求返回数据类型
     * @param stringify  是否序列化请求参数
     * @param {{}} extraOptions 其他参数
     */
    request.send = function (method, url, data, callback, type, stringify, extraOptions) {
        var formatData = request.getFormatData(url, data);
        !type && (type = 'json');
        //前置处理
        request.preHandle(formatData[1], url);

        var name = config.name[url],
            index = config.environment,
            realize;
        typeof index == 'undefined' && (console.info("环境变量 config.environment 没有配置, 默认取值为0的环境"), index = 0);
        !name ? console.error("config.url中无 " + url + " 对应的值") : (
            config.realize && config.realize[name] && (
                realize = typeof config.realize[name] == 'function' ? typeof config.realize[name] :
                    (!!config.realize[name][index] ? config.realize[name][index] : void 0)
            )
        );

        if (!realize) {
            var options = extraOptions || {};
            options.type = method;
            options.data = !stringify ? formatData[1] : JSON.stringify(formatData[1]);
            options.dataType = type;
            options.success = function (res) {
                //后置处理
                request.postHandle(res, options.data, url);
                callback(res);
            };
            $.ajax(formatData[0], options);
        }
        else {
            var requestData = !stringify ? formatData[1] : JSON.stringify(formatData[1]);

            console.info('Custom realize function for "' + url + '", and request data is: ');
            console.info(requestData);

            var result = realize(requestData);

            console.info('result is: ');
            console.info(result);

            //后置处理
            request.postHandle(result, data, url);
            callback(result);
        }
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

    /**
     * 获取当前配置的环境值
     * @returns {number}
     */
    request.getEnv = function () {
        return config.environment ? config.environment : 0;
    };

    /**
     * 设置配置，可多次调用
     * @param paramConfig
     */
    request.config = function (paramConfig) {
        // 未初始化过
        if (!initialized) {
            initialized = !0;
            config = paramConfig;
        }
        else {
            $.extend(true, config, paramConfig);
        }
    };

    $.seeAjax = request;

})(jQuery);
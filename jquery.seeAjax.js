if (typeof jQuery === 'undefined') {
    throw new Error('jquery.seeAjax requires jQuery')
}

/**
 * json-refactor
 * Created by senntyou on 2016/11/22.
 */
(function( self ) {

    /**
     * 模拟函数
     * @param data
     * @returns {*}
     */
    function fakeFunctionWithReturn (data) {
        return data;
    }

    //克隆对象
    function cloneObject() {
        var obj = arguments[0];
        if (typeof obj === 'undefined' || obj === null)
            return {};

        if (typeof obj !== 'object')
            return obj;

        //第二个参数是属性名称列表，就采用该列表进行刷选
        //否则就克隆所有属性
        var attrs = arguments[1], attr;
        var enable_spec_attr = true;
        if (!(attrs instanceof Array)) {
            attrs = obj;
            enable_spec_attr = false;
        }

        var result = {};
        var key;
        for (key in attrs) {
            attr = enable_spec_attr ? attrs[key] : key;
            if (obj.hasOwnProperty(attr)) {
                if (obj[attr] instanceof Array) {
                    result[attr] = cloneArray(obj[attr]);
                }
                else if (typeof obj[attr] === 'object') {
                    result[attr] = cloneObject(obj[attr]);
                } else {
                    result[attr] = obj[attr];
                }
            }
        }

        return result;
    }

    //克隆数组
    function cloneArray(array) {
        if (typeof array === 'undefined' || array === null)
            return [];

        if (!(array instanceof Array))
            return [];

        var result = [];

        array.map(function (item, index) {
            typeof item !== 'object' ? (
                result[index] = item
            ) : (
                result[index] = cloneObject(item)
            )
        });

        return result;
    }

    /**
     * 转换类型
     * @param value 带转换的值
     * @param format 格式
     * @returns {*}
     */
    function convertDataType(value, format) {
        switch (format) {
            case 'int':
                return parseInt(value);
            case 'float':
                return parseFloat(value);
            case 'bool':
                return !!value;
            case 'string':
                return value + '';
            default :
                !!self[format] && typeof self[format] == 'function' ? (value = self[format](value)) : (
                    console.error("" + format + "：没有此内置操作，也无此全局函数")
                );
                return value;
        }
    }

    /**
     * 转换点语法的数据
     * @param target
     * @param mapKey
     * @param originalKey
     * @param format
     */
    function convertDataOfDotKey(target, mapKey, originalKey, format) {
        var originKeyArrayByDot = originalKey.split('.'),//用点号分隔originKey(目前最多只\支持四级)
            length = originKeyArrayByDot.length,
            lastKey = originKeyArrayByDot[length - 1],//最后一个键
            hasArrayMark = !!~lastKey.indexOf('[]'),//是否有数组操作标记
            value;
        if (length == 2) {
            hasArrayMark ? (
                value = target[originKeyArrayByDot[0]] != undefined && target[originKeyArrayByDot[0]]
            ) : (
                value = target[originKeyArrayByDot[0]] != undefined && target[originKeyArrayByDot[0]][originKeyArrayByDot[1]]
            );
        } else if (length == 3) {
            hasArrayMark ? (
                value = target[originKeyArrayByDot[0]] != undefined && target[originKeyArrayByDot[0]][originKeyArrayByDot[1]] != undefined &&
                    target[originKeyArrayByDot[0]][originKeyArrayByDot[1]]
            ) : (
                value = target[originKeyArrayByDot[0]] != undefined && target[originKeyArrayByDot[0]][originKeyArrayByDot[1]] != undefined &&
                    target[originKeyArrayByDot[0]][originKeyArrayByDot[1]][originKeyArrayByDot[2]]
            );

        } else if (length == 4) {
            hasArrayMark ? (
                value = target[originKeyArrayByDot[0]] != undefined && target[originKeyArrayByDot[0]][originKeyArrayByDot[1]] != undefined &&
                    target[originKeyArrayByDot[0]][originKeyArrayByDot[1]][originKeyArrayByDot[2]] != undefined &&
                    target[originKeyArrayByDot[0]][originKeyArrayByDot[1]][originKeyArrayByDot[2]]
            ) : (
                value = target[originKeyArrayByDot[0]] != undefined && target[originKeyArrayByDot[0]][originKeyArrayByDot[1]] != undefined &&
                    target[originKeyArrayByDot[0]][originKeyArrayByDot[1]][originKeyArrayByDot[2]] != undefined &&
                    target[originKeyArrayByDot[0]][originKeyArrayByDot[1]][originKeyArrayByDot[2]][originKeyArrayByDot[3]]
            );

        }
        else {
            console.error("点语法的解析最大只支持四级");
            return;
        }

        hasArrayMark ? (
            target[mapKey] = getDataOfArrayMark(value, lastKey)
        ) : (
            typeof value != 'object' ? (
                target[mapKey] = !format ? value : convertDataType(value, format)
            ) : (
                Array.isArray(value) ? (
                    target[mapKey] = cloneArray(value)
                ) : (
                    target[mapKey] = cloneObject(value)
                )
            )
        );

    }

    /**
     * 转换普通值
     * @param target
     * @param mapKey
     * @param originalKey
     * @param format
     * @param keepOriginKey
     */
    function convertDataOfCommon(target, mapKey, originalKey, format, keepOriginKey) {
        var targetValue = target[originalKey];//目标值
        target[mapKey] = !format ? targetValue : convertDataType(targetValue, format);
        //如果原来的键与现在的键相同，则只是数据转换，不更换键名，不删除
        mapKey != originalKey && !keepOriginKey && delete target[originalKey];
    }

    /**
     * 转换数组操作
     * @param target
     * @param mapKey
     * @param originalKey
     */
    function convertDataOfArrayMark(target, mapKey, originalKey) {
        target[mapKey] = getDataOfArrayMark(target, originalKey);
    }

    /**
     * 获取数组操作的值
     * @param target
     * @param originalKey
     * @returns {*}
     */
    function getDataOfArrayMark(target, originalKey) {
        var originalKeyArray = originalKey.split("|"),
            key = originalKeyArray[0].slice(0, -2),//操作属性
            subKey = originalKeyArray[1],//对每一个数组中都要操作的值
            action = originalKeyArray[2],//操作
            actionExtra = originalKeyArray[3],//actionExtra
            subAction = originalKeyArray[4],//subAction
            hasSubAction = !!subAction,//是否有子操作
            subActionFunction,//subAction对应的函数
            targetValueOfKey = target[key];

        var sumValue = 0,
            averageValue = 0,
            maxValue = 0,
            minValue = 0,
            concatArray = [];
        if (!targetValueOfKey || !Array.isArray(targetValueOfKey)) {
            console.error("配置的键 " + key + " 不存在，或者值不是数组");
            return;
        }

        if (hasSubAction) {
            switch (subAction) {
                case "round":
                    subActionFunction = Math.round;
                    break;
                case "floor":
                    subActionFunction = Math.floor;
                    break;
                case "ceil":
                    subActionFunction = Math.ceil;
                    break;
                case "abs":
                    subActionFunction = Math.abs;
                    break;
                default:
                    subActionFunction = fakeFunctionWithReturn;
                    action != "concat" && console.error("子操作 " + subAction + " 不存在");
                    break
            }
        }

        switch (action) {
            //求和
            case "sum":
                targetValueOfKey.map(function (item) {
                    hasSubAction ? (
                        sumValue += subActionFunction(item[subKey])
                    ) : (
                        sumValue += item[subKey]
                    );

                });
                return sumValue;
            //求平均
            case "average":
                targetValueOfKey.map(function (item) {
                    hasSubAction ? (
                        sumValue += subActionFunction(item[subKey])
                    ) : (
                        sumValue += item[subKey]
                    );

                });
                averageValue = sumValue / targetValueOfKey.length;
                return averageValue;
            //求最大值
            case "max":
                targetValueOfKey.map(function (item, index) {
                    var value = hasSubAction ? subActionFunction(item[subKey]) : item[subKey];
                    !index ? (
                        maxValue = value
                    ) : (
                        value > maxValue && (maxValue = value)
                    );
                });
                return maxValue;
            //求最小值
            case "min":
                targetValueOfKey.map(function (item, index) {
                    var value = hasSubAction ? subActionFunction(item[subKey]) : item[subKey];
                    !index ? (
                        minValue = value
                    ) : (
                        value < minValue && (minValue = value)
                    );
                });
                return minValue;
            //求字符串链接
            case "concat":
                targetValueOfKey.map(function (item) {
                    var value = hasSubAction ? item[subKey][subAction]() : item[subKey];
                    concatArray.push(value);
                });
                return concatArray.join(!actionExtra ? "" : actionExtra);
            default:
                console.error("操作 " + action + " 不存在");
                return;
        }

    }

    /**
     * 转换值
     * @param target 目标对象
     * @param map map
     * @param mapKey map中的key
     */
    function convertValue(target, map, mapKey) {
        //字符串
        var originMapValue = map[mapKey],//map值
            keepOriginKey = !!~originMapValue.indexOf('^'),//是否保留原来的键名
            mapValue = keepOriginKey ? originMapValue.slice(0, -1) : originMapValue,//map值
            mapValueArray = mapValue.split('!'),//map value: "key!format", 感叹号前面是键值，感叹号后面是转换值
            originalKey = mapValueArray[0],//原始键
            format = mapValueArray[1];//格式

        var hasDot = !!~originalKey.indexOf('.'),//里面是否有点号
            hasArrayMark = !hasDot && !!~originalKey.indexOf('[]');//是否有数组标示

        //有点操作符
        hasDot ? (
            originalKey.split('.').length > 1 ? (
                convertDataOfDotKey(target, mapKey, originalKey, format)
            ) : (
                console.error("配置键名 " + mapValue + " 有误")
            )

        ) : (
            //数组操作
            hasArrayMark ? (
                convertDataOfArrayMark(target, mapKey, originalKey)
            ) : (
                //普通操作
                convertDataOfCommon(target, mapKey, originalKey, format, keepOriginKey)
            )
        );


    }

    //格式化json
    function format(target, map) {
        if (!map || typeof map != 'object') return;

        //是数组
        Array.isArray(map) ? (
            target.map(function (item) {
                //如果是对象或数组
                !!map[0] && typeof map[0] == 'object' && typeof item == 'object' && format(item, map[0]);
            })
        ) : (
            //是对象
            Object.keys(map).map(function (mapKey) {
                var mapValue,//map值
                    targetValue;//目标值

                mapValue = map[mapKey];
                //如果是以下划线开头，并且在原数据中不存在这个键，则就是某个字段的二次改变
                if (mapKey.startsWith('_') && typeof target[mapKey] == 'undefined') {
                    targetValue = target[mapKey.slice(1)];
                    // 如果值不存在，返回
                    if (!targetValue) return;
                } else {
                    targetValue = target[mapKey];
                }

                //是对象或数组并且原数据中存在这个字段
                if (typeof mapValue == 'object') {
                    Array.isArray(mapValue) ? (//array
                        targetValue.map(function (item) {
                            //如果是对象或数组
                            if (!!mapValue[0] && typeof mapValue[0] == 'object' && typeof item == 'object') format(item, mapValue[0]);
                        })
                    ) : (//object
                        format(targetValue, mapValue)
                    );
                } else if (typeof mapValue == 'string') {
                    //字符串
                    convertValue(target, map, mapKey);
                }
                else {
                    console.error('无法解析key: \n' + (typeof mapValue == 'string' ? mapValue : (typeof mapValue == 'object' ? JSON.stringify(mapValue) : '')));
                }
            })
        );
    }

    /**
     * 初始函数
     * @param source 原对象
     * @param map 键值地图
     * @param returnNewJson 是否返回新的json文件（默认：false）
     */
    var jsonRefactor = function (source, map, returnNewJson) {
        var target = !!returnNewJson ? (
            source instanceof Array ? cloneArray(source) : cloneObject(source)
        ) : source;

        !!map && typeof map == 'object' ? format(target, map) : console.error("传入的map格式有误，请传入对象或数组");
        return target;
    };

    JSON.refactor = jsonRefactor;

})( this );

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
     * @param url int/string
     */
    request.postHandle = function (res, url) {
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
                !index && commonHandle(res)
            ) : (
                //数组
                !!commonHandle[index] && commonHandle[index](res)
            )
        );
        !!nameHandle && (
            typeof nameHandle == 'function' ? (
                //是函数
                !index && nameHandle(res)
            ) : (
                //数组
                !!nameHandle[index] && nameHandle[index](res)
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

        var options = extraOptions || {};

            options.type = method;
            options.data = !stringify ? formatData[1] : JSON.stringify(formatData[1]);
            options.dataType = type;
            options.success = function (res) {
                //后置处理
                request.postHandle(res, url);
                callback(res);
            };

        $.ajax(formatData[0], options);
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
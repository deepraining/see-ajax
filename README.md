# 一个封装的 jQuery ajax 请求，可以通过配置更新请求参数，前置处理，json序列化，后置处理

## 内置

* [json-refactor](https://github.com/senntyou/json-refactor)

## 使用

### 1. 加载脚本

```
<script src="jquery.js"></script>
<script src="jquery.seeAjax.js"></script>
```

### 2. 加载配置

```
$.seeAjax.config(config);
```

示例配置

```
{
    environment: 0, //环境标识（用于数组选值）：0->服务器环境, 1->本地环境
    name: {
        test: "test"
    },
    url: {
        test: [
            "a.json",
            "b.json"
        ]
    },
    requestKeys: {
        test: [
            {
                key1: 'keya'
            },
            {
                key1: 'keyb'
            }
        ]
    },
    responseRefactor: {
        common: [
            {
                success: 'result!bool'
            },
            {
                success: 'result!bool'
            }
        ],
        test: [
            {
                data: [
                    {
                        newId: 'id',
                        images: 'pics',
                        _images: [
                            {
                                newId: 'id',
                                newSrc: 'src'
                            }
                        ]
                    }
                ]
            },
            {
                data: [
                    {
                        images: [
                            {
                                newId: 'id',
                                newSrc: 'src'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    preHandle: {
        common: [
            function (req) {
                req.common = 0
            },
            function (req) {
                req.common = 1
            }
        ],
        test: [
            function (req) {
                req.test = 0
            },
            function (req) {
                req.test = 1
            }
        ]
    },
    postHandle: {
        common: [
            function (res, req) {
                res.common = 0
            },
            function (res, req) {
                res.common = 1
            }
        ],
        test: [
            function (res, req) {
                res.test = 0
            },
            function (res, req) {
                res.test = 1
            }
        ]
    },
    realize: {
        test: [
            function (req) {
                var result = {test: 0};
                return result;
            },
            function (req) {
                var result = {test: 1};
                return result;
            }
        ]
    }
}
```

配置说明

* environment: 主要用来辨识环境索引，一般来说，后面的配置项都会使用数组的形式
* name: 用来标示一个请求
* url: 请求的地址，每一个值都必须是数组
* requestKeys: 请求的参数名，必须是数组。如果数组元素也是数组，则在请求的时候传入的data值也必须是数组，并且顺序需要一一对应；如果是map，则在请求的时候传入的data值也必须是map。
* responseRefactor: 针对返回的json数据做重构。[json-refactor](https://github.com/senntyou/json-refactor)（common是保留字段，会应用在每一个返回上）
* preHandle: 请求预处理。针对请求做更多的动态处理。（common是保留字段，会应用在每一个返回上）
* postHandle: 请求后置处理。针对返回的数据做更多的动态处理，在json重构之后执行。（common是保留字段，会应用在每一个返回上）
* 执行流程：url -> requestKeys -> preHandle(common) -> preHandle(specified) -> responseRefactor -> postHandle(common) -> postHandle(specified)
* realize: 自定义实现返回数据，代替ajax
    1. 在前后端分离，并行开发的过程中，或为了加快响应速度，有可能是以模板字符串的形式返回到前端，这个函数便是为此而生
    2. 参数会传入原有请求的 data 值，并且应当有返回值

### 3. 方法

* $.seeAjax.config(config) 配置（可多次配置）
* $.seeAjax.getEnv() 获取当前的环境值
* $.seeAjax.get(url, data, callback[, type][, extraOptions]) get请求
* $.seeAjax.post(url, data, callback[, type][, stringify][, extraOptions]) post请求
* $.seeAjax.put(url, data, callback[, type][, stringify][, extraOptions]) put请求
* $.seeAjax.delete(url, data, callback[, type][, stringify][, extraOptions]) delete请求

说明：

* url：索引值或者键名（字符串），取决于配置
* data：数组或者map，取决于配置
* stringify：是否序列化请求参数
* extraOptions：其他需要的 jQuery ajax 配置参数
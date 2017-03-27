# 一个封装的 jQuery ajax 请求，可以通过配置更新请求参数，前置处理，json序列化，后置处理

## 内置
* [json-refactor](https://github.com/senntyou/json-refactor)

## use

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
        function (data) {
            data.common = '0'
        },
        function (data) {
            data.common = '1'
        }
    ],
    test: [
        function (data) {
            data.test = '0'
        },
        function (data) {
            data.test = '1'
        }
    ]
},
postHandle: {
    common: [
        function (data) {
            data.common = '0'
        },
        function (data) {
            data.common = '1'
        }
    ],
    test: [
        function (data) {
            data.test = '0'
        },
        function (data) {
            data.test = '1'
        }
    ]
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
* 执行流程：url -> requestKeys -> preHandle(common) -> preHandle(special) -> responseRefactor -> postHandle(common) -> postHandle(special)

### 3. 方法

* $.seeAjax.config(config) 初始化页面
* $.seeAjax.get(url, data, callback[, type]) get请求，url是索引值还是键名（字符串）取决于配置，data是数组还是map也取决于配置
* $.seeAjax.post(url, data, callback[, type][, stringify]) post请求，其他同get请求(stringify: 是否序列化请求参数)
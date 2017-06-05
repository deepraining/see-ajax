/**
 * Created by senntyou on 2017/3/27.
 */

$.seeAjax.config({
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
});

$.seeAjax.get('test', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);

    $.seeAjax.config({
        environment: 1
    });
    $.seeAjax.post('test', {key1: 'haha'}, function (res) {
        console.log('env: 1');
        console.log(res);

        makeTest2();
    }, !0);
});

function makeTest2() {
    $.seeAjax.config({
        environment: 0, //环境标识（用于数组选值）：0->服务器环境, 1->本地环境
        name: {
            test2: "test2"
        },
        url: {
            test2: [
                "a.json",
                "b.json"
            ]
        },
        requestKeys: {
            test2: [
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
            test2: [
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
                    data.common2 = '0'
                },
                function (data) {
                    data.common2 = '1'
                }
            ],
            test2: [
                function (data) {
                    data.test2 = '0'
                },
                function (data) {
                    data.test2 = '1'
                }
            ]
        },
        postHandle: {
            common: [
                function (data) {
                    data.common2 = '0'
                },
                function (data) {
                    data.common2 = '1'
                }
            ],
            test2: [
                function (data) {
                    data.test2 = '0'
                },
                function (data) {
                    data.test2 = '1'
                }
            ]
        }
    });

    $.seeAjax.put('test2', {key1: 'haha'}, function (res) {
        console.log('env: 0');
        console.log(res);

        $.seeAjax.config({
            environment: 1
        });
        $.seeAjax.delete('test2', {key1: 'haha'}, function (res) {
            console.log('env: 1');
            console.log(res);
        });
    });
}
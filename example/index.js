/**
 * Created by senntyou on 2017/3/27.
 */

seeAjax.config({
    env: 0,
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
                success: 'result|bool'
            },
            {
                success: 'result|bool'
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
                res.common = 0;
                console.log('req:');
                console.log(req);
            },
            function (res, req) {
                res.common = 1;
                console.log('req:');
                console.log(req);
            }
        ],
        test: [
            function (res, req) {
                res.test = 0;
                console.log('req:');
                console.log(req);
            },
            function (res, req) {
                res.test = 1;
                console.log('req:');
                console.log(req);
            }
        ]
    }
});

$.seeAjax.get('test', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);

    $.seeAjax.config({
        env: 1
    });
    $.seeAjax.post('test', {key1: 'haha'}, function (res) {
        console.log('env: 1');
        console.log(res);

        makeTest2();
    }, !0);
});

function makeTest2() {
    $.seeAjax.config({
        env: 0,
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
                    success: 'result|bool'
                },
                {
                    success: 'result|bool'
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
                function (req) {
                    req.common2 = 0
                },
                function (req) {
                    req.common2 = 1
                }
            ],
            test2: [
                function (req) {
                    req.test2 = 0
                },
                function (req) {
                    req.test2 = 1
                }
            ]
        },
        postHandle: {
            common: [
                function (res) {
                    res.common2 = 0
                },
                function (res) {
                    res.common2 = 1
                }
            ],
            test2: [
                function (res) {
                    res.test2 = 0
                },
                function (res) {
                    res.test2 = 1
                }
            ]
        },
        method: {
            test2: [
                'get',
                'post'
            ]
        }
    });

    $.seeAjax.put('test2', {key1: 'haha'}, function (res) {
        console.log('env: 0');
        console.log(res);

        $.seeAjax.config({
            env: 1
        });
        $.seeAjax.delete('test2', {key1: 'haha'}, function (res) {
            console.log('env: 1');
            console.log(res);
        });
    });
}
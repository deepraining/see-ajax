
module.exports = seeAjax => {
    seeAjax.config({
        test: {
            method: [
                void 0,
                'post'
            ],
            stringify: [
                void 0,
                true
            ],
            settings: [
                {
                    headers: {
                        haha: 'hehe'
                    }
                }
            ],
            url: [
                "/data/a.json",
                "/data/b.json"
            ],
            requestKeys: [
                void 0,
                {
                    key1: 'keyb'
                }
            ],
            responseRefactor: [
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
            ],
            preHandle: [
                function (req) {
                    req.test = 0
                },
                function (req) {
                    req.test = 1
                }
            ],
            postHandle: [
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
        },
        common: {
            responseRefactor: [
                {
                    success: 'result|bool'
                },
                {
                    success: 'result|bool'
                }
            ],
            preHandle: [
                function (req) {
                    req.common = 0
                },
                function (req) {
                    req.common = 1
                }
            ],
            postHandle: [
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
            ]
        }
    });

    seeAjax.setEnv(0);

    seeAjax('test', {key1: 'haha'}, function (res) {
        console.log('env: 0');
        console.log(res);

        seeAjax.setEnv(1);
        seeAjax('test', {key1: 'haha'}, function (res) {
            console.log('env: 1');
            console.log(res);

            makeTest2();
        });
    });

    function makeTest2() {
        seeAjax.config({
            test2: {
                method: [
                    'post',
                    'post'
                ],
                url: [
                    "/data/a.json",
                    "/data/b.json"
                ],
                requestKeys: [
                    {
                        key1: 'keya'
                    }
                ],
                responseRefactor: [
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
                ],
                preHandle: [
                    function (req) {
                        req.test2 = 0
                    },
                    function (req) {
                        req.test2 = 1
                    }
                ],
                postHandle: [
                    function (res) {
                        res.test2 = 0
                    },
                    function (res) {
                        res.test2 = 1
                    }
                ]
            },
            common: {
                responseRefactor: [
                    {
                        success: 'result|bool'
                    },
                    {
                        success: 'result|bool'
                    }
                ],
                preHandle: [
                    function (req) {
                        req.common2 = 0
                    },
                    function (req) {
                        req.common2 = 1
                    }
                ],
                postHandle: [
                    function (res) {
                        res.common2 = 0
                    },
                    function (res) {
                        res.common2 = 1
                    }
                ]
            }
        });
        seeAjax.setEnv(0);

        seeAjax('test2', {key1: 'haha'}, function (res) {
            console.log('env: 0');
            console.log(res);

            seeAjax.setEnv(1);
            seeAjax('test2', {key1: 'haha'}, function (res) {
                console.log('env: 1');
                console.log(res);
            });
        }, function (xhr) {
            console.log(arguments);
        });
    }
};

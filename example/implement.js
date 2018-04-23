/**
 * Created by senntyou on 2017/3/27.
 */

seeAjax.config('implement', {
    url: [
        "",
        "b.json"
    ],
    requestKeys: [
        {
            key1: 'keya'
        },
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
        function (res) {
            res.test = 0
        },
        function (res) {
            res.test = 1
        }
    ],
    implement: [
        function (data) {
            return {
                "result": 1,
                "msg": "success",
                "data": [
                    {
                        "id": 1,
                        "pics": [
                            {
                                "id": 1,
                                "src": "a.jpg"
                            },
                            {
                                "id": 2,
                                "src": "b.jpg"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "pics": [
                            {
                                "id": 11,
                                "src": "aa.jpg"
                            },
                            {
                                "id": 22,
                                "src": "bb.jpg"
                            }
                        ]
                    }
                ]
            }
        }
    ]
});

seeAjax('implement', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);
});

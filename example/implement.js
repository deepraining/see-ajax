/**
 * Created by senntyou on 2017/3/27.
 */

seeAjax.config({
    env: 0,
    name: {
        exportImplement: 'implement'
    },
    url: {
        implement: [
            "",
            "b.json"
        ]
    },
    requestKeys: {
        implement: [
            {
                key1: 'keya'
            },
            {
                key1: 'keyb'
            }
        ]
    },
    responseRefactor: {
        implement: [
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
        implement: [
            function (req) {
                req.test = 0
            },
            function (req) {
                req.test = 1
            }
        ]
    },
    postHandle: {
        implement: [
            function (res) {
                res.test = 0
            },
            function (res) {
                res.test = 1
            }
        ]
    },
    implement: {
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
    }
});

$.seeAjax.get('exportImplement', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);
});

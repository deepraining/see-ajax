/**
 * Created by senntyou on 2017/3/27.
 */

seeAjax.set({
    request: settings => {
        settings.type = settings.dataType;
        window.reqwest(settings);
    }
});

seeAjax.config('custom', {
    stringify: [
        void 0,
        !0
    ],
    method: [
        void 0,
        'post'
    ],
    url: [
        "a.json",
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
    ]
});

seeAjax('custom', {key1: 'haha'}, function (res) {
    console.log('env: 0');
    console.log(res);

    seeAjax.setEnv(1);
    seeAjax('custom', {key1: 'hehe'}, function (res) {
        console.log('env: 1');
        console.log(res);
    });
});

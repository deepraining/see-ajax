
"use strict";

const moment = require('moment');

const packageJson = require('./package.json');

module.exports = {
    // module definition
    modules: {
        index: {
            js: 'src/index.js',
            filename: 'see-ajax',
            library: 'seeAjax',
            libraryTarget: "umd"
        },
        custom: {
            js: 'src/index.custom.js',
            filename: 'see-ajax.custom',
            library: 'seeAjax',
            libraryTarget: "umd"
        },
        demo: {
            html: 'demo/index.html',
            js: 'demo/index.js'
        },
        'demo-implement': {
            html: 'demo/implement.html',
            js: 'demo/implement.js'
        },
        'demo-custom': {
            html: 'demo/custom.html',
            js: 'demo/custom.js'
        },
        example: {
            html: 'example/index.html',
            js: 'example/index.js'
        },
        'example-implement': {
            html: 'example/implement.html',
            js: 'example/implement.js'
        },
        'example-custom': {
            html: 'example/custom.html',
            js: 'example/custom.js'
        }
    },
    externals: {
        jquery : {
            commonjs: 'jquery',
            amd: 'jquery',
            commonjs2: 'jquery',
            root: 'jQuery'
        },
        'json-refactor' : {
            commonjs: 'json-refactor',
            amd: 'json-refactor',
            commonjs2: 'json-refactor',
            root: 'JSONRefactor'
        }
    },
    banner: `
    see-ajax v${packageJson.version}

    https://github.com/senntyou/see-ajax

    @senntyou <jiangjinbelief@163.com>

    ${moment().format('YYYY-MM-DD HH:mm:ss')}
    `,
    treatAllMethodsAsGet: !0
};


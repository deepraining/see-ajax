
const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const packageJson = require('../package.json');

const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '..', '/dist'),
        filename: 'see-ajax.js',
        library: 'seeAjax',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-1']
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(`
    see-ajax v${packageJson.version}

    https://github.com/senntyou/see-ajax

    @senntyou <jiangjinbelief@163.com>

    ${moment().format('YYYY-MM-DD HH:mm:ss')}
    `)
    ],
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
    }
};

webpack(config, function(err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.log('has error');
        info.errors.forEach(function (error) {
            console.error(error);
        });
    }

    if (stats.hasWarnings()) {
        console.log('has warning');
        info.warnings.forEach(function (warning) {
            console.error(warning);
        });
    }
});

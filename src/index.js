
'use strict';

var $ = require('jquery');

var config = require('./config');
var getEnv = require('./get_env');
var getMethod = require('./methods/get');
var postMethod = require('./methods/post');
var putMethod = require('./methods/put');
var deleteMethod = require('./methods/delete');

var request = {
    config: config,
    getEnv: getEnv,
    get: getMethod,
    post: postMethod,
    put: putMethod,
    delete: deleteMethod
};

$.seeAjax = request;

module.exports = request;
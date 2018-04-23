
'use strict';

var $ = require('jquery');

var config = require('./config');
var setEnv = require('./set_env');
var getEnv = require('./get_env');
var send = require('./send');

var seeAjax = send;

seeAjax.config = config;
seeAjax.setEnv = setEnv;
seeAjax.getEnv = getEnv;

module.exports = seeAjax;
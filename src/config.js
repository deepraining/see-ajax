
'use strict';

var $ = require('jquery');

var data = require('./data');

/**
 * config application
 *
 * @param option
 */
module.exports = (option) => {
    $.extend(true, data.option, option);
};

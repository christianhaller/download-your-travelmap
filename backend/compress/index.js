/*global require,module */
var Promise = require('promise'),
    gzip = require('gzip-buffer');

module.exports = function (str) {
    'use strict';
    return new Promise(function (fulfill) {
        gzip.gzip(str,function(zipped){
            //console.log('compressed');
            fulfill(zipped);
        });
    });
};
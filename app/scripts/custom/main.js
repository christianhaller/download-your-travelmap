/*global require, window, document, jQuery */

var NProgress = require('nprogress');
require('expose?$!jquery');
require('./url-form');
require('./fontLoader')();
require('./tracking').init();

(function(window, document, $, NProgress) {
    'use strict';
    $(document).ready(function () {
        NProgress.start();
        window.setTimeout(function () {
             NProgress.done();
        }, 100);
    });
})(window, document, jQuery, NProgress);



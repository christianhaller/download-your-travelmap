/*global require, window, document, jQuery */

var NProgress = require('nprogress');
require('expose-loader?$!jquery');
require('./url-form');
require('./fontLoader')();

(function(window, document, $, NProgress) {
    'use strict';
    NProgress.configure({showSpinner: false, parent: '.content'});
    $(document).ready(function () {
        NProgress.start();
        window.setTimeout(function () {
             NProgress.done();
        }, 100);
    });
})(window, document, jQuery, NProgress);



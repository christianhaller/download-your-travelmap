/*global require, module, ga, window */
require('vendor/analytics');
module.exports = (function (window, ga) {

    'use strict';

    var trackJavaScriptError = function (e) {
            var ie = window.event,
                errMsg = e.message || ie.errorMessage,
                errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
            trackEvent('send', 'event', 'JavaScript Error', errMsg, errSrc, {
                'nonInteraction': 1
            });
        },
        trackEvent = function (data) {
            console.log(data);
            ga(data.data[0], data.data[1], data.data[2], data.data[3], data.data[4]);
        },
        init = function(){
            ga('create', 'UA-53443219-1', 'auto');
            ga('send', 'pageview');
        };



    if (window.addEventListener) {
        window.addEventListener('error', trackJavaScriptError, false);
    } else if (window.attachEvent) {
        window.attachEvent('onerror', trackJavaScriptError);
    } else {
        window.onerror = trackJavaScriptError;
    }

    return {
        init : init,
        trackEvent: trackEvent
    };
})(window, ga);



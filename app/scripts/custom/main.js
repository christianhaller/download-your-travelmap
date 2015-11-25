/*global ga,Tc,NProgress,document,window, jQuery */
(function (window, document, $, ga, NProgress, Tc) {
    'use strict';

    $(document).ready(function () {
        var $page = $(document.body),
            application = new Tc.Application($page);
        application.registerModules();
        application.registerModule($page, 'Tracking', null, ['Tracking']);
        application.start();

        NProgress.start();
        window.setTimeout(function () {
            NProgress.done();
        }, 100);
    });

    ga('create', 'UA-53443219-1', 'auto');
    ga('send', 'pageview');


    (function () {
        window.NProgress.configure({showSpinner: false, parent: '.content'});
        var trackJavaScriptError = function (e) {
            var ie = window.event,
                errMsg = e.message || ie.errorMessage,
                errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
            ga('send', 'event', 'JavaScript Error', errMsg, errSrc, {
                'nonInteraction': 1
            });
        };

        if (window.addEventListener) {
            window.addEventListener('error', trackJavaScriptError, false);
        } else if (window.attachEvent) {
            window.attachEvent('onerror', trackJavaScriptError);
        } else {
            window.onerror = trackJavaScriptError;
        }
    }());


    window.requestAnimationFrame(function () {
        var elementToInsertLinkBefore = document.getElementsByTagName('script')[0],
            linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.media = 'all';
        linkElement.href = 'https://fonts.googleapis.com/css?family=Roboto:400';
        elementToInsertLinkBefore.parentNode.insertBefore(linkElement, elementToInsertLinkBefore);

    });

}(window, document, jQuery, ga, NProgress, Tc));




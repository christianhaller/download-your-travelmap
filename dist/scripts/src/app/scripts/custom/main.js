/*global ga,Tc */
(function($) {
    'use strict';
    $(document).ready(function() {
        var $page = $(document.body),
            application = new Tc.Application($page);
        application.registerModules();
        application.registerModule($page, 'Tracking',null,['Tracking']);
        application.start();
    });
    ga('create', 'UA-53443219-1', 'auto');
    ga('send', 'pageview');
})(Tc.$);

(function(){
    'use strict';
    var trackJavaScriptError = function(e) {
        var ie = window.event,
            errMsg = e.message || ie.errorMessage,
            errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
        ga('send', 'event', 'JavaScript Error', errMsg, errSrc, { 'nonInteraction': 1 });
    };

    if (window.addEventListener) {
        window.addEventListener('error', trackJavaScriptError, false);
    } else if (window.attachEvent) {
        window.attachEvent('onerror', trackJavaScriptError);
    } else {
        window.onerror = trackJavaScriptError;
    }
})();

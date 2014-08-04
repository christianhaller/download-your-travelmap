/*global ga */
(function($) {
    'use strict';
    $(document).ready(function() {
        var $page = $(document.body),
            application = new Tc.Application($page);
        application.registerModules();
        application.start();
    });
    ga('create', 'UA-53443219-1', 'auto');
    ga('send', 'pageview');
})(Tc.$);
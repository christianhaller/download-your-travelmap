(function ($) {
    'use strict';
    $(document).ready(function () {
        var $page = $(document.body),
            application = new Tc.Application($page);

        application.registerModules();
        application.start();

    });
})(Tc.$);
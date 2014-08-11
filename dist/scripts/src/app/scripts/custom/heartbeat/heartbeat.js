/* global Tc,console */
(function($) {
    'use strict';
    Tc.Module.Heartbeat = Tc.Module.extend({
        on: function(callback) {
            /*setInterval($.ajax, 2000, {
                url: '/php-script/last-map.php',
                success: function(json) {
                    console.log(json);
                },
                error: this.error
            });*/
            callback();
        },
        error: function() {}
    });
})(Tc.$);
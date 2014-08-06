/* global Tc,console */
(function($) {
    'use strict';
    Tc.Module.Heartbeat = Tc.Module.extend({
        on: function() {
            setInterval($.ajax, 2000, {
                url: '/php-script/last-map.php',
                success: function(json) {
                    console.log(json);
                },
                error: this.error
            });
        },
        error: function() {}
    });
})(Tc.$);
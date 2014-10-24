/* global Tc,ga */
(function($) {
    'use strict';
    Tc.Module.Tracking = Tc.Module.extend({

        on: function(callback) {
            callback();
        },
        onTrack: function(data) {
            console.log(data);
            ga(data.data[0], data.data[1], data.data[2], data.data[3], data.data[4],data.data[5]);
        }
    });
})(Tc.$);
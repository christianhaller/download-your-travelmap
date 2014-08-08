/* global Tc,ga */
(function($) {
    'use strict';
    Tc.Module.Tracking = Tc.Module.extend({

        on: function(callback) {
            callback();
        },
        onTrack:function(data){
            ga(data.join());
        }
    });
})(Tc.$);
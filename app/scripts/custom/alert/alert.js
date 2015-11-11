/* global Tc */
(function() {
    'use strict';
    Tc.Module.Alert = Tc.Module.extend({
        onShowAlert: function(response) {
            var $ctx = this.$ctx;
            $ctx.addClass('url-form__alert--error');
            $ctx.find('span').empty().text(response);
        },
        onRemoveAlert: function() {
            var $ctx = this.$ctx;
            $ctx.find('span').empty();
            $ctx.removeClass('url-form__alert--error');
        },
        on: function(callback) {
            callback();
        }
    });
})();
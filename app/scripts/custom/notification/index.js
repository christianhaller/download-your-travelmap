/*global module */
module.exports = (function() {
    'use strict';
    return {
        show: function($ctx, response) {
            $ctx.addClass('url-form__alert--error');
            $ctx.find('span').empty().text(response);
        },
        remove: function($ctx) {
            $ctx.find('span').empty();
            $ctx.removeClass('url-form__alert--error');
        }
    };
})();

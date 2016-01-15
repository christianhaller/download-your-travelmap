/*global module */
module.exports = (function() {
    'use strict';
    var selector = 'url-form__alert--error';
    return {
        show: function($ctx, response) {
            $ctx.addClass(selector)
                .find('span').empty().text(response);
        },
        remove: function($ctx) {
            $ctx.removeClass(selector)
                .find('span').empty();
        }
    };
})();

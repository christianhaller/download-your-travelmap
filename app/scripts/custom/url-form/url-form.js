/* global module, require, window, jQuery */

var NProgress = require('nprogress'),
    config = require('config');

module.exports = (function (window, $, NProgress, config) {
    'use strict';
    var $ctx = $('.url-form'),
        $url = $ctx.find('#url'),
        mod = {
            after: function () {
                var $ctx = this.$ctx,
                    $url = $ctx.find('#url');
                if (window.location.search.indexOf('?url=') === 0) {
                    $url = $ctx.find('#url');
                    $url.val(window.location.search.substring(5));
                    $ctx.trigger('auto');
                }
            },
            validateInput: function ($url, url) {
                if (mod.isUrlValid(url)) {
                    $url.removeClass(config.classNames.error).addClass(config.classNames.success);
                    return true;
                } else {
                    $url.addClass(config.classNames.error).removeClass(config.classNames.success);
                    return false;
                }
            },
            isUrlValid: function (url) {
                var re = new RegExp("^(http|https)://www.tripadvisor.", "i");
                return re.test(url);
            }
        },
        lastUrl;

    $ctx.on('submit auto', function (e) {
        var data,
            eventType = e.type,
            url = $.trim($url.val());

        e.preventDefault();

        if (url === lastUrl) {
            return;
        }
        if (!mod.validateInput($url, url)) {
            $url.focus();
            /*mod.fire('Track', {
                'data': ['send', 'event', 'map', 'error (' + eventType + ')', url]
            });*/
            return;
        }
        lastUrl = url;
        data = {
            'url': url
        };

        NProgress.start();
        $.ajax({
            data: data,
            method: 'GET',
            dataType: 'json',
            url: $ctx.attr('action')
        }).error(function () {

        }).success(function (response) {
            if (typeof response.errorMessage !== 'undefined') {

                // kaputt
                NProgress.done();
                //mod.fire('Error', response.errorMessage);
                //mod.fire('ShowAlert', response.errorMessage);
                /*mod.fire('Track', {
                    'data': ['send', 'event', 'map', 'error (' + eventType + ') ' + response.errorMessage, url]
                });*/
                return;
            }
            NProgress.done();
            mod.fire('RemoveAlert');
            //mod.fire('Track', {
            //     'data': ['send', 'event', 'map', 'success (' + eventType + ')', url]
            // });
            response.url = data.url;
            //mod.fire('DataReceived', response);
        });
    });
})(window, jQuery, NProgress, config);


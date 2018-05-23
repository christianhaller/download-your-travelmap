/* global module, require, window, jQuery */

var NProgress = require('nprogress'),
    config = require('config'),
    notification = require('../notification'),
    map = require('../map');

module.exports = (function (window, $, NProgress, config) {
    'use strict';
    var $ctx = $('.url-form'),
        $url = $ctx.find('#url'),
        mod = {

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
                var re = new RegExp('^(http|https)://www.tripadvisor.', 'i');
                return re.test(url);
            }
        },
        lastUrl;




    $ctx.on('submit auto', function (e) {
        var data,
            url = $.trim($url.val());

        e.preventDefault();

        if (url === lastUrl) {
            return;
        }
        if (!mod.validateInput($url, url)) {
            $url.focus();
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
            var $notification = $('.js-notification');
            NProgress.done();
            if (typeof response.errorMessage !== 'undefined') {
                // kaputt
                notification.show($notification, response.errorMessage);
                return;
            }

            notification.remove($notification);
            response.url = data.url;
            map.showResponse(response);
        });
    });

    if (window.location.search.indexOf('?url=') === 0) {

        $url.val(window.location.search.substring(5));
        $ctx.trigger('auto');
    }

})(window, jQuery, NProgress, config);

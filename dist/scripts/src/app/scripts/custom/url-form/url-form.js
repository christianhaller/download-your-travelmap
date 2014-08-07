/* global Tc,ga */
(function($) {
    'use strict';
    Tc.Module.Url = Tc.Module.extend({
        on: function(callback) {
            var $ctx = this.$ctx,
                mod = this,
                $url = $ctx.find('#url'),
                lastUrl;
            $ctx.on('submit auto', function(e) {
                var data,
                    url = $url.val();
                e.preventDefault();
                if (url === lastUrl) {
                    return;
                }
                if (!mod.validateInput($url)) {
                    $url.focus();
                    return;
                }
                lastUrl = url;
                data = {
                    'url': url
                };
                $.ajax({
                    data: data,
                    method: 'POST',
                    dataType: 'json',
                    url: $ctx.attr('action')
                }).error(function(response) {
                    // kaputt
                    mod.fire('Error', response);
                    mod.fire('ShowAlert', response);
                    ga('send', 'event', 'map', 'error', url);
                }).success(function(response) {
                    mod.fire('RemoveAlert');

                    ga('send', 'event', 'map', 'success', url);

                    response.url = data.url;
                    mod.fire('DataReceived', response);
                });
            });
            callback();
        },
        after: function() {
            var $ctx = this.$ctx,
                $url = $ctx.find('#url');
            if (window.location.search.indexOf('?url=') === 0) {
                $url = $ctx.find('#url');
                $url.val(window.location.search.substring(5));
                $ctx.trigger('auto');
            }
        },
        validateInput: function($url) {
            var url = $url.val(),
                config = this.sandbox.getConfig();
            if (this.isUrlValid(url)) {
                $url.removeClass(config.classNames.error).addClass(config.classNames.success);
                return true;
            } else {
                $url.addClass(config.classNames.error).removeClass(config.classNames.success);
                return false;
            }
        },
        isUrlValid: function(url) {
            var re = new RegExp("^(http|https)://www.tripadvisor.[\.a-z]+/member", "i");
            return re.test(url);
        }
    });
})(Tc.$);
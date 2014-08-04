(function($) {
    'use strict';
    Tc.Module.Url = Tc.Module.extend({
        on: function() {
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
                if (!this.validateInput($ctx, $url)) {
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
                    mod.fire('ShowAlert', response);
                }).success(function(response) {
                    mod.fire('RemoveAlert');
                    response.url = data.url;
                    mod.fire('DataReceived', response);
                });
            });
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
        validateInput: function($url, $ctx) {
            var url = $url.val(),
                config = this.sandbox.getConfig();
            if (this.isUrlValid(url)) {
                $ctx.removeClass(config.classNames.error).addClass(config.classNames.success);
                return true;
            } else {
                $ctx.addClass(config.classNames.error).removeClass(config.classNames.success);
                return false;
            }
        },
        isUrlValid: function(url) {
            var re = new RegExp("^(http|https)://www.tripadvisor.[a-z]+/member", "i");
            return re.test(url);
        }
    });
})(Tc.$);
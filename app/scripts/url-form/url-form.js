(function ($) {
    Tc.Module.Url = Tc.Module.extend({
        on: function (callback) {

            var $ctx = this.$ctx,
                mod = this,
                $url = $ctx.find('#url'),
                config = this.sandbox.getConfig(),
                lastUrl,

                validateInput = function () {
                    var url = $url.val(),
                        isUrlValid = function (url) {
                            var re = new RegExp("^(http|https)://www.tripadvisor.[a-z]+/member", "i");
                            return re.test(url);
                        };
                    if (isUrlValid(url)) {
                        $ctx.removeClass(config.classNames.error).addClass(config.classNames.success);
                        return true;
                    } else {
                        $url.focus();
                        $ctx.addClass(config.classNames.error).removeClass(config.classNames.success);
                        return false;
                    }
                };


            $ctx.on('submit auto', function (e) {
                var data,

                    url = $url.val(),
                    $alert = $ctx.find('.pure-alert-error');
                e.preventDefault();
                if (url === lastUrl) {
                    //return;
                }
                if (!validateInput()) {
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
                }).error(function () {
                    //$alert.show().text(response.responseJSON.message);
                    mod.fire('ondataReceived');


                }).success(function (response) {
                    mod.fire('DataReceived', response);
                });
            });


            callback();

            if (window.location.search.indexOf('?url=') === 0) {
                $url.val(decodeURIComponent(window.location.search.substring(5)));
                $ctx.trigger('auto');
            }


        }
    });
})(Tc.$);



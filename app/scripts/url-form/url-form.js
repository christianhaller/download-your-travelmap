(function ($) {
    Tc.Module.Url = Tc.Module.extend({
        on: function (callback) {

            var $ctx = this.$ctx,
                mod = this,
                lastUrl;








            $ctx.on('submit auto', function (e) {
                var data,
                    $url = $ctx.find('#url'),
                    url = $url.val(),
                    $alert = $ctx.find('.pure-alert-error');
                e.preventDefault();
                if (url === lastUrl) {
                    return;
                }
                /*if (!validateInput($url)) {
                    return;
                }*/
                lastUrl = url;
                data = {
                    'url': url
                };
                $.ajax({
                    data: data,
                    method: 'POST',
                    dataType: 'json',

                    /*headers: {
                     "X-Test-Header": "xtest-value"
                     },*/

                    url: $ctx.attr('action')
                }).error(function () {
                    //$alert.show().text(response.responseJSON.message);
                    mod.fire('dataReceived', {},['map']);


                }).success();
            });



            callback();
        },
        after: function () {
        }
    });
})(Tc.$);



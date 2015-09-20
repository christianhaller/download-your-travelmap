(function () {
    var http = require('http');

    exports.handler = function(event, context) {
        console.log('start request to ' + event.url);
        http.get(event.url, function(res) {
            console.log("Got response: " + res.statusCode);
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

        console.log('end request to ' + event.url);
        context.done(null);
    }
})();

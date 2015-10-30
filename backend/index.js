exports.handler = function (event, context) {
    var fs = require('fs'),
        request = require('./request'),
        Promise = require('promise'),
        validate = require('./validate'),
        csv = require('./csv'),
        compress = require('./compress'),
        kml = require('./kml'),
        upload = require('./upload'),
        profileUrl = decodeURIComponent(event.url).trim();


    // Let's go
    request(profileUrl).then(function (map) {
        var date = new Date().toISOString(),
            kmlData = kml(map);
        compress(kmlData)
            .then(function (kmlData) {
                return upload('kml', map.username + '-' + date + '.kml', kmlData, 'application/vnd.google-earth.kml+xml', 'gzip')
            })
            .then(function (url) {
                map.kml = url;
                return new Promise.resolve(map);
            })
            .then(csv)
            .then(compress)
            .then(function (csvData) {
                //filename, content, contentType, contentEncoding
                return upload('csv', map.username + '-' + date + '.csv', csvData, 'text/csv', 'gzip');

            }, function (err) {
                console.log(err);
            })
            .then(function (url) {
                map.csv = url;
                context.succeed({'data': map});
            });
    },function(err){
            context.fail(err);
    });
};

/*global exports, require */
exports.handler = function (event, context) {
    'use strict';
    var request = require('./request'),
        Promise = require('promise'),
        csv = require('./csv'),
        compress = require('./compress'),
        kml = require('./kml'),
        upload = require('./upload'),
        map;

    // Let's go
    request(decodeURIComponent(event.url).trim())
        .then(function (data) {
            var kmlData = kml(data);
            map = data;
            map.date =  new Date().toISOString();
            return new Promise.resolve(kmlData);
        })
        .then(compress)
        .then(function (kmlData) {
            return upload('kml', map.username + '-' + map.date + '.kml', kmlData, 'application/vnd.google-earth.kml+xml', 'gzip');
        })
        .then(function (url) {
            map.kml = url;
            return new Promise.resolve(map);
        })
        .then(csv)
        .then(compress)
        .then(function (csvData) {
            //filename, content, contentType, contentEncoding
            return upload('csv', map.username + '-' + map.date + '.csv', csvData, 'text/csv', 'gzip');

        })
        .then(function (url) {
            map.csv = url;
            context.succeed({'data': map});
        })
        .catch(function (err) {
            //console.log(err);
            context.fail(err)

        });
};

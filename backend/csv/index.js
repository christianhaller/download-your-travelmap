/*global module, require, console */
var json2csv = require('json2csv'),
    Promise = require('promise'),
    fields = ['lat', 'lon', 'name', 'been'];

module.exports = function (data) {
    'use strict';
    return new Promise(function (fulfill, reject) {
        var map = [];
        data.places.forEach(function (item) {
            item.been = item.flags.join(',');
            item.lon = item.lng;
            map.push(item);
        });

        json2csv({data: map, fields: fields}, function (err, csv) {
            if (err) {
                console.log('err');
                reject(err);
            } else {
                fulfill(csv);
            }
        });
    });
};



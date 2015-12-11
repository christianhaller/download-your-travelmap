/*global require, module */
var request = require('request'),
    Promise = require('promise'),
    parse = require('../parse'),

// get host and path
    getRequestOptions = function (str) {
        'use strict';

        return {
            'url': str,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            }
        };
    },
    parseResponse = function (profileUrl, html) {
        'use strict';
        var map = {};
        map.stats = parse.getStats(html);
        map.places = parse.getPlaces(html);
        map.username = parse.getUserName(html);
        map.lang = parse.getLanguage(html);
        map.avatar = parse.getAvatar(html);
        return map;
    },
    parseMapLink = function (profileUrl, html) {
        'use strict';
        return parse.getLink(profileUrl, html);
    };

module.exports = function (profileUrl) {
    'use strict';
    return new Promise(function (fullfil, reject) {
        var mapCallback = function (response) {

                try {
                    fullfil(parseResponse(profileUrl, response));
                } catch (e) {
                    reject(new Error('can\'t parse ' + profileUrl + ', please double check your input'));

                }

            },

            profileCallback = function (response) {
                var mapUrl = parseMapLink(profileUrl, response);
                try {
                    fullfil(parseResponse(profileUrl, response));
                } catch (e) {
                    if (mapUrl !== undefined) {
                        request(getRequestOptions(mapUrl), function (err, response) {
                            mapCallback(response.body);
                        });
                    } else {
                        reject(new Error(e));
                    }
                }

            };
        request(getRequestOptions(profileUrl), function (error, response) {
            if (error) {
                reject(new Error(error));
                return;
            }

            if (response.statusCode === 404) {
                reject('profile not found');
            }
            if (response.statusCode === 301) {
                request(getRequestOptions(response.headers.location), function (error, response) {
                    profileCallback(response.body);
                });
            } else {

                profileCallback(response.body);
            }
        });

    });
};
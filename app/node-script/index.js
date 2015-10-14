exports.handler = function (event, context) {
    var fs = require('fs'),
        csv = require('./csv'),
        http = require('http'),
        validate = require('./validate'),
        parseTripAdvisorHtml = require('./parseTripAdvisorHtml'),
        url = require('url'),
        compress = require('./compress'),
        kml = require('./kml'),
        Promise = require('promise'),
        upload = require('./upload'),
        profileUrl = decodeURIComponent(event.url).trim(),

    // get host and path
        getRequestOptions = function (str) {
            var urlParts = url.parse(str);

            return {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
                },
                host: urlParts.host,
                path: urlParts.path
            };
        },

        createCsv = function (map) {
            var date = new Date().toISOString(),
                kmlData = kml(map);
            upload('kml/hey' + '-' + date + '.kml', kmlData, 'kml', 'kml')
                .then(function () {
                    return new Promise.resolve(map);
                })

                .then(csv)

                .then(compress)

                .then(function (data) {
                    //filename, content, contentType, contentEncoding
                    return upload(map.username + '-' + date + '.csv', data, 'text/csv', 'gzip');

                }, function (err) {
                    console.log(err);
                })

                .then(function (url) {
                    map.csv = {'url': url};
                    context.succeed({'data': map});
                });


        },
        request = function () {

            var map = {},
                mapCallback = function (response) {
                    var str = '';
                    response.on('data', function (chunk) {
                        str += chunk;
                    });

                    response.on('error', function (e) {
                        context.fail(e);
                    });
                    response.on('end', function () {
                        try {
                            map = parseMap(str);
                            createCsv(map);
                        }
                        catch (e) {
                            context.fail('can\'t parse URI, be sure it\s your profile url like http://www.tripadvisor.com/MemberProfile-a_uid.3E4845AC4C03CEC948467E3B41809B4E?offset=0');

                        }


                    });

                },

                profileCallback = function (response) {
                    var html = '';
                    response.on('data', function (chunk) {
                        html += chunk;
                    });

                    response.on('end', function () {


                        map.username = parseTripAdvisorHtml.getUserName(html);
                        map.lang = parseTripAdvisorHtml.getLanguage(html);
                        map.mapUrl = parseTripAdvisorHtml.getLink(profileUrl, html);
                        map.avatar = parseTripAdvisorHtml.getAvatar(html);


                        try {
                            map.stats = parseTripAdvisorHtml.getStats(html);
                            map.places = parseTripAdvisorHtml.getPlaces(html);
                            createCsv(map);
                        }
                            // second request
                        catch (e) {
                            http.get(getRequestOptions((map.mapUrl)), mapCallback).end();


                        }

                    });
                };
            http.get(getRequestOptions(profileUrl), profileCallback).end();


        },
        parseMap = function (html) {
            var map = {};
            try {
                map.stats = parseTripAdvisorHtml.getStats(html);
                map.places = parseTripAdvisorHtml.getPlaces(html);
                return map;
            }
            catch (e) {
                context.fail(e);
            }
        };

    // start
    if (!profileUrl) {
        context.fail('no url');
        return;
    }

    try {
        validate(profileUrl);
    }
    catch (e) {
        context.fail(e);
        return;
    }

    request();
};

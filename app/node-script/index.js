exports.handler = function (event, context) {
    var fs = require('fs'),
        csv = require('./createCsv'),
        http = require('http'),
        validate = require('./validate'),
        parseTripAdvisorHtml = require('./parseTripAdvisorHtml'),
        url = require('url'),
        kml = require('./kml'),
        map = {},
        profileUrl = decodeURIComponent(event.url).trim(),

    // get host and path
        getRequestOptions = function (str) {
            var urlParts = url.parse(str);

            return {
                headers: {
                    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
 'Accept-Language':'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4',
                    'Upgrade-Insecure-Requests':'1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
                },
                host: urlParts.host,
                path: urlParts.path
            };
        },

        getCsv = function () {
            var date = new Date().toISOString();

            csv.getCsv(map.username + '-' + date + '.csv', map, function (url) {
                map.csv = {'url': url};
                context.succeed({'data': map});
            });
        },
        request = function () {
            var mapCallback = function (response) {
                    var str = '';
                    response.on('data', function (chunk) {
                        str += chunk;
                    });

                    response.on('error', function (e) {
                        context.fail(e);
                    });
                    response.on('end', function () {
                        try {
                            parseMap(str);
                            getCsv();
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
                            getCsv();
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
            try {
                map.stats = parseTripAdvisorHtml.getStats(html);
                map.places = parseTripAdvisorHtml.getPlaces(html);
            }
            catch (e) {
                context.fail(e);
            }
        };


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

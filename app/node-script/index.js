exports.handler = function (event, context) {
    console.log(event);
    var fs = require('fs'),
        csv = require('./createCsv'),
        http = require('http'),
        validate = require('./validate'),
        parseTripAdvisorHtml = require('./parseTripAdvisorHtml'),
        url = require('url'),

        map = {},
        profileUrl = decodeURIComponent(event.url).toLowerCase().trim(),

    // get host and path
        getRequestOptions = function (str) {
            var urlParts = url.parse(str);
            return {
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
                        try{
                            parseMap(str);
                            getCsv();
                        }
                        catch(e){
                            context.fail('can\'t parse URI, be sure it\s your profile url like http://www.tripadvisor.com/MemberProfile-a_uid.3E4845AC4C03CEC948467E3B41809B4E?offset=0');

                        }


                    });

                },

                profileCallback = function (response) {
                    console.log('rrrr');
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

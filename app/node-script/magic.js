exports.handler = function (event, context) {
	console.log(event);
    //context.succeed(event);
    var fs = require('fs'),

		http = require('http'),
		parseTripAdvisorHtml = require('./parseTripAdvisorHtml'),
		url = require('url'),
		map = {},
		profileUrl = decodeURIComponent(event.url),

        getRequestOptions = function (str) {
			var urlParts = url.parse(str);
			return {
				host: urlParts.host,
				path: urlParts.path
			};
		},
        jsonp = function(){

            return {'data':map};
        },
		request = function () {
			var mapCallback = function(response){
				var str = '';
				response.on('data', function (chunk) {
					str += chunk;
				});

				response.on('end', function () {
					parseMap(str);
					context.succeed(jsonp());
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
                    map.mapUrl = parseTripAdvisorHtml.getLink(profileUrl,html);
                    map.avatar = parseTripAdvisorHtml.getAvatar(html);

                    try{
                        map.stats = parseTripAdvisorHtml.getStats(html);
                        map.places = parseTripAdvisorHtml.getPlaces(html);
                        context.succeed(jsonp());
                    }
                    catch(e){
                        http.get(getRequestOptions((map.mapUrl)),mapCallback).end();

                    }

				});
			};


			http.get(getRequestOptions(profileUrl), profileCallback).end();
		},

		parseMap = function (html) {
			map.stats = parseTripAdvisorHtml.getStats(html);
			map.places = parseTripAdvisorHtml.getPlaces(html);
		};





	if(!profileUrl){
		context.succeed("wrong");
		return;
	}

	request();
};

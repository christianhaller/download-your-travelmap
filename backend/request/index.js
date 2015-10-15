var http = require('http'),
	url = require('url'),
	parse = require('../parse'),

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
	parseResponse = function(profileUrl, html){
		var map = {};
		map.stats = parse.getStats(html);
		map.places = parse.getPlaces(html);
		map.username = parse.getUserName(html);
		map.lang = parse.getLanguage(html);
		map.avatar = parse.getAvatar(html);
		return map;
	},
	parseMapLink  = function(profileUrl, html){
		return parse.getLink(profileUrl, html);
	};

module.exports = function (profileUrl,cb,err) {

	var mapCallback = function (response) {
			var str = '';
			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				try {
					cb(parseResponse(profileUrl,str));
				}
				catch (e) {
					err('can\'t parse URI, be sure it\s your profile url like http://www.tripadvisor.com/MemberProfile-a_uid.3E4845AC4C03CEC948467E3B41809B4E?offset=0');

				}
			});
		},

		profileCallback = function (response) {
			var html = '';
			response.on('data', function (chunk) {
				html += chunk;
			});
			response.on('end', function () {
				var mapUrl;
				try {
					mapUrl = parseMapLink(profileUrl,html);
					cb(parseResponse(profileUrl,html));
				}
					// second request
				catch (e) {
					if(typeof mapUrl !== 'undefined'){
						console.log('second request');
						http.get(getRequestOptions(mapUrl), mapCallback).end();
					}
					else {
						err('wtf');
					}
				}
			});
		};
	http.get(getRequestOptions(profileUrl), profileCallback).end();
};
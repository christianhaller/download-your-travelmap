exports.handler = function (event, context) {
	//console.log(event);
	var fs = require('fs'),
		iso = require('./iso'),
		http = require('http'),
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
		request = function () {
			var mapCallback = function(response){
				var str = '';
				response.on('data', function (chunk) {
					str += chunk;
				});

				response.on('end', function () {
					parseMap(str);
					context.succeed(map);
				});

			},

			profileCallback = function (response) {
				var str = '';
				response.on('data', function (chunk) {
					str += chunk;
				});

				response.on('end', function () {
					parseHtml(str);
					http.request(getRequestOptions((map.mapUrl)),mapCallback).end();
				});
			};


			http.request(getRequestOptions(profileUrl), profileCallback).end();
		},
		parseHtml = function (html) {
			map.username = getUserName(html);
			map.lang = getLanguage(html);
			map.mapUrl = getLink(html);
			map.avatar = getAvatar(html);
		},
		parseMap = function (html) {
			map.stats = getStats(html);
			map.places = getPlaces(html);
		},

		getPlaces = function (html) {
			var places = [],

				taPlaces = JSON.parse('{"' + getStringBetween(html, '"store":{"', ',"modules.membercenter.model.FriendCount') + '}')['modules.unimplemented.entity.LightWeightPin'];
			for (var key in taPlaces) {
				var taPlace,
					name,
					arrayOfStrings,
					cityName,
					countryName,
					isoCode,
					place;

				if (taPlaces.hasOwnProperty(key)) {
					taPlace = taPlaces[key];
					name = taPlace.name;
					arrayOfStrings = name.split(',');
					cityName = arrayOfStrings[0];
					countryName = arrayOfStrings[1].trimLeft();
					isoCode = iso.get(countryName);
					place = {
						city: cityName,
						county: countryName,
						iso: isoCode,
						flags: taPlace.flags,
						lat: taPlace.lat,
						lng: taPlace.lng,
						name: name
					};
					places.push(place);
				}


			}
			return places;


		},
		getStats = function (html) {
			var str = getStringBetween(html, '"idKeys":["memberId"],"properties":{"country":', '</html>');
			return JSON.parse('{"country":' + getStringBetween(str, '"idKeys":["memberId"],"properties":{"country":', '}') + '}');

		},
		getStringBetween = function (str, start, end) {
			var left = str.substring(str.indexOf(start) + start.length);
			return left.substring(left.indexOf(end), -left.length);


		},
		getLink = function (html) {
			var prefix = '/TravelMap-a_uid.',
				urlParts = url.parse(profileUrl);
			return urlParts.protocol+'//'+urlParts.hostname+prefix+getStringBetween(html, prefix, '"');
		},
		getAvatar = function (html) {
			return getStringBetween(html, 'class="avatarUrl" src="', '"')
		},
		getLanguage = function (html) {
			return getStringBetween(html, 'bingMapsLang = "', '"');
		},
		getUserName = function (html) {
			return getStringBetween(html, '<title>', ' -');
		};

	if(!profileUrl){
		context.succeed("wrong");
		return;
	}

	request();
};

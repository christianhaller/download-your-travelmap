(function () {
    var fs = require('fs'),
        iso = require('./iso'),
        map = {},
        parseHtml = function (html) {
            map.username = getUserName(html);
            map.lang = getLanguage(html);
            map.link = getLink(html);
            map.avatar = getAvatar(html);
        },
        parseMap = function (html) {
            map.stats = getStats(html);
            map.places = getPlaces(html);
            console.log(map.places);
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
            //return left.substring(10,10);
            return left.substring(left.indexOf(end), -left.length);


        },
        getLink = function (html) {
            return getStringBetween(html, '/TravelMap-a_uid.', '"');
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
    fs.readFile('./test/markup/jeanbaptisteq.htm', {encoding: 'utf-8'}, function (err, data) {
        if (!err) {

            parseHtml(data);
            fs.readFile('./test/markup/map.html', {encoding: 'utf-8'}, function (err, data) {
                if (!err) {
                    parseMap(data);
                }

            });
        } else {
            console.log(err);
        }

    });
})();

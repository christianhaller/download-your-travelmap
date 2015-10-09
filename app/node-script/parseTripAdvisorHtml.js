var url = require('url'),
    iso = require('./iso'),
    getStringBetween = function (str, start, end) {
        var left = str.substring(str.indexOf(start) + start.length);
        return left.substring(left.indexOf(end), -left.length);


    };

module.exports = {


    getStats: function (html) {
        var str = getStringBetween(html, '"idKeys":["memberId"],"properties":{"country":', '</html>');
        return JSON.parse('{"country":' + getStringBetween(str, '"idKeys":["memberId"],"properties":{"country":', '}') + '}');

    },
    getLink: function (profileUrl, html) {
        var prefix = '/TravelMap-a_uid.',
            urlParts = url.parse(profileUrl);
        return urlParts.protocol + '//' + urlParts.hostname + prefix + getStringBetween(html, prefix, '"');
    },
    getAvatar: function (html) {
        return getStringBetween(html, 'class="avatarUrl" src="', '"')
    },
    getLanguage: function (html) {
        return getStringBetween(html, 'bingMapsLang = "', '"');
    },
    getUserName: function (html) {
        return getStringBetween(html, '<title>', ' -');
    },
    getPlaces: function (html) {
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


    }

};

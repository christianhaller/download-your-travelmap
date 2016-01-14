/* global require, module, window, jQuery */
var config = require('config');
require('vendor/jquery-jvectormap-1.2.2.min');
require('vendor/jquery-jvectormap-world-mill-en');
module.exports = (function (window, $, config) {
    'use strict';
    var setUsername = function ($ctx, username) {
            $ctx.find('.js-username').text(username);
        },
        setCsvDownloadButton = function ($ctx, csv) {
            $ctx.find('.js-download-bar__button__csv').attr('href', csv);

        },
        hideMap = function ($ctx) {
            $ctx.removeClass(config.classNames.block);
            $ctx.addClass(config.classNames.isHidden);
        },
        showMap = function ($ctx) {
            $ctx.removeClass(config.classNames.isHidden);
            $ctx.addClass(config.classNames.block);
        },
        getMarker = function (array, config) {
            var markers = [];
            $.each(array, function (index, value) {
                var marker = {
                    'style': config.been,
                    'latLng': [value.lat, value.lng],
                    'name': value.name
                };
                if ($.inArray('want', value.flags) !== -1) {
                    marker.style = config.want;
                }
                if ($.inArray('fave', value.flags) !== -1) {
                    marker.style = config.fave;
                }
                markers.push(marker);
            });
            return markers;
        },
        getRegions = function (array) {
            var regions = {};
            $.each(array, function (index, value) {
                var iso = value.iso;
                if (iso === '') {
                    return;
                }
                if (typeof regions[iso] === 'undefined') {
                    regions[iso] = 1;
                } else {
                    regions[iso]++;
                }
            });
            return regions;
        },
        /*countCountries = function (list) {
            var coutryList = [];
            $.each(list, function (index, value) {
                if ($.inArray(value.country, coutryList) === -1) {
                    if ($.inArray('been', value.flags) !== -1) {
                        coutryList.push(value.country);
                    }
                }
            });
            return coutryList.length;
        },*/
        pushState = function (url) {
            var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?url=' + url;
            if (window.history && window.history.pushState) {
                window.history.pushState('', '', newUrl);
            }
        },
        setStats = function ($ctx, stats) {

            $ctx.find('.js-stats-bar .country').text(stats.country);
            $ctx.find('.js-stats-bar .city').text(stats.city);
            $ctx.find('.js-stats-bar .percent').text((stats.country / 193 * 100).toFixed(2) + '%');
        },
        setKmlDownloadButton = function ($ctx, kml) {
            $ctx.find('.js-download-bar__button__kml').attr('href', kml);


        };
    return {
        hideMap : hideMap,
        showResponse: function (response) {
            var $ctx = $('.js-map'),
                $map = $ctx.find('#jvectormap'),
                $thisIs = $ctx.find('.js-this-is__city'),
                jvectormapConfig = config.jvectormap;
            showMap($ctx);
            if (response.data.lang === 'en') {
                jvectormapConfig.series.regions[0].values = getRegions(response.data.places);
            }
            jvectormapConfig.markers = getMarker(response.data.places, config);
            jvectormapConfig.onViewportChange = function (event, number) {
                $map.attr('data-zoomlevel', Math.round(number));
            };
            jvectormapConfig.onMarkerLabelShow = function (event, label) {
                $thisIs.text($(label).text());
            };
            $map.empty().vectorMap(jvectormapConfig);
            setCsvDownloadButton($ctx, response.data.csv);
            setKmlDownloadButton($ctx, response.data.kml);
            setUsername($ctx, response.data.username);
            pushState(response.url);
            setStats($ctx, response.data.stats);
        }
    };
})(window, jQuery, config);

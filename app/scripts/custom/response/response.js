(function($) {
    'use strict';
    Tc.Module.Response = Tc.Module.extend({
        onDataReceived: function(response) {
            var $ctx = this.$ctx.show(),
                config = this.sandbox.getConfig(),
                $map = $ctx.find('#map'),
                $thisIs = $ctx.find('.js-this-is__city'),
                jvectormapConfig = config.jvectormap;
            if (response.data.lang === 'en') {
                jvectormapConfig.series.regions[0].values = this.getRegions(response.data.places);
            }
            jvectormapConfig.markers = this.getMarker(response.data.places, config);
            jvectormapConfig.onMarkerLabelShow = function(event, label) {
                console.log($thisIs.length);
                $thisIs.text($(label).text());
            };
            $map.vectorMap(jvectormapConfig);
        },
        on: function() {
            var googleStaticMap = {
                'latlng': '',
                'country': '',
                'latlngLowPrecision': ''
            };
        },
        getMarker: function(array, config) {
            var markers = [];
            $.each(array, function(index, value) {
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
                //googleStaticMap.latlng += '%7C' + value.lat + ',' + value.lng;
                //googleStaticMap.latlngLowPrecision += '%7C' + Math.round(value.lat * 100) / 100 + ',' + Math.round(value.lng * 100) / 100;
                //googleStaticMap.country += '%7C' + value.country;
            });
            return markers;
        },
        getRegions: function(array) {
            var regions = {};
            $.each(array, function(index, value) {
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
        countCountries: function(list) {
            var coutryList = [];
            $.each(list, function(index, value) {
                if ($.inArray(value.country, coutryList) === -1) {
                    if ($.inArray('been', value.flags) !== -1) {
                        coutryList.push(value.country);
                    }
                }
            });
            return coutryList.length;
        },
        after: function() {
            if (history.pushState) {
                window.history.pushState('', '', '/?url=' + encodeURIComponent(data.url));
            }
        }
    });
})(Tc.$);
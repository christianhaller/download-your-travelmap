(function($) {
    Tc.Module.Response = Tc.Module.extend({
        onDataReceived: function() {
         console.log('yysdfsfdsfrrr');
        },



        on: function(callback) {

                console.log('sss');
                return;
                var $response = $('#response'),
                    $thisIs = $response.find('#thisIs span'),
                    $map = $response.find('#map'),
                    markers,
                    regions = {},
                    googleStaticMap = {
                        'latlng': '',
                        'country': '',
                        'latlngLowPrecision': ''
                    },
                    createRegions = function (array) {
                        var regions = {};
                        // get nur, wenn die Sprache englisch ist
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
                    countCountries = function (list) {
                        var coutryList = [];
                        $.each(list, function (index, value) {
                            if ($.inArray(value.country, coutryList) === -1) {
                                if ($.inArray('been', value.flags) !== -1) {
                                    coutryList.push(value.country);
                                }
                            }
                        });
                        return coutryList.length;
                    },
                    createMarker = function (array) {
                        var markers = [];
                        $.each(array, function (index, value) {
                            var marker = {
                                'style': options.been,
                                'latLng': [value.lat, value.lng],
                                'name': value.name
                            };
                            if ($.inArray('want', value.flags) !== -1) {
                                marker.style = options.want;
                            }
                            if ($.inArray('fave', value.flags) !== -1) {
                                marker.style = options.fave;
                            }
                            markers.push(marker);
                            googleStaticMap.latlng += '%7C' + value.lat + ',' + value.lng;
                            googleStaticMap.latlngLowPrecision += '%7C' + Math.round(value.lat * 100) / 100 + ',' + Math.round(value.lng * 100) / 100;
                            //googleStaticMap.country += '%7C' + value.country;
                        });
                        return markers;
                    };
                $alert.hide();
                $map.empty();
                $response.show();
                if (history.pushState) {
                    window.history.pushState('', '', '/?url=' + encodeURIComponent(data.url));
                }
                markers = createMarker(response.data.places);
                if (response.data.lang === 'en') {
                    regions = createRegions(response.data.places);
                }
                $map.vectorMap({
                    map: 'world_mill_en',
                    onMarkerLabelShow: function (event, label, index) {
                        $thisIs.text($(label).text());
                    },
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    zoomOnScroll: false,
                    hoverColor: false,
                    regionStyle: {
                        initial: {
                            fill: '#eee',
                            "fill-opacity": 1,
                            stroke: 'none',
                            "stroke-width": 0,
                            "stroke-opacity": 1
                        },
                        hover: {
                            fill: '#ccc'
                        }
                    },
                    series: {
                        regions: [
                            {
                                values: regions,
                                scale: ['#C8EEFF', '#0071A4'],
                                normalizeFunction: 'polynomial'
                            }
                        ]
                    },
                    backgroundColor: '#fff',
                    markers: markers
                });
                createGoogleStaticMap(googleStaticMap);
                createStats({
                    'cities': markers.length,
                    'countries': countCountries(response.data.places)
                });
                // csv button
                $('#csv a').attr('href', '/data/' + response.csv);


            callback();
        },
        after: function() { }
    });
})(Tc.$);
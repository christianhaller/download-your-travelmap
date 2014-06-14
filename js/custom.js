$(document).on('ready', function () {





    countries = [];

    var createMarker = function (array) {
        var markers = [];
        $.each(array, function () {
            var marker = {};
            marker.latLng = [];
            marker.latLng.push(this.lat);
            marker.latLng.push(this.lng);
            marker['name'] = this.name;
            markers.push(marker);
            marker.style = {fill: 'red', r: 3};

            var parts = this.name.split(',');
            countries.push(parts[parts.length - 1]);

        });

        return markers;
    };

    if(typeof data === 'undefined'){
        return;
    }

    var markers = createMarker(data);

    /*$('button').on('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('id');
        mapObject.removeAllMarkers();

        mapObject.addMarkers(markers, []);

    });*/

    $('#world-map').vectorMap({
        map: 'world_mill_en',

        normalizeFunction: 'polynomial',
        hoverOpacity: 0.7,
        zoomOnScroll:false,
        hoverColor: false,
        markerStyle: {
            initial: {
                fill: '#F8E23B',
                stroke: '#383f47'
            }
        },
        /*series: {
         regions: [{
         values: gdpData,
         scale: ['#C8EEFF', '#0071A4'],
         normalizeFunction: 'polynomial'
         }]
         },*/

        backgroundColor: '#383f47',

        markers: markers
    });


});









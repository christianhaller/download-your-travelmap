(function($) {
    'use strict';
    $(document).ready(function() {
        var $page = $(document.body),
            config = {
                classNames: {
                    'error': 'error',
                    'success': 'success'
                },
                'been': {
                    'fill': 'yellow',
                    'r': 3
                },
                'want': {
                    'fill': '#68b04d',
                    'r': 3
                },
                'fave': {
                    'fill': '#ff0099',
                    'r': 5
                },
                'jvectormap': {
                    map: 'world_mill_en',
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
                        regions: [{
                            values: [],
                            scale: ['#F9FCF8', '#68b04d'],
                            normalizeFunction: 'polynomial'
                        }]
                    },
                    backgroundColor: '#fff',
                    markers: []
                }
            },
            application = new Tc.Application($page, config);
        application.registerModules();
        application.start();
    });
})(Tc.$);
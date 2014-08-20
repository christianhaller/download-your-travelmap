/* global Tc */
Tc.Config = {
    /**
     * The paths for the different types of dependencies.
     *
     * @property dependencies
     * @type Object
     */
    classNames: {
        'error': 'error',
        'success': 'success',
        'isHidden': 'is-hidden',
        'block': 'block'
    },
    'been': {
        'fill': '#FFD700',
        'r': 3,
        'stroke': '#FFD700'

    },
    'want': {
        'fill': '#68b04d',
        'r': 3,
        'stroke': '68b04d'
    },
    'fave': {
        'fill': '#ff0099',
        'r': 5,
        'stroke': '#ff0099'
    },
    'jvectormap': {
        map: 'world_mill_en',
        normalizeFunction: 'polynomial',
        hoverOpacity: 0.7,
        zoomOnScroll: false,
        hoverColor: false,
        markerStyle: {

            hover: {
                fill: 'black',
                r: '5'
            }
        },
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
                    values: [],
                    scale: ['#F9FCF8', '#68b04d'],
                    normalizeFunction: 'polynomial'
                }
            ]
        },
        backgroundColor: '#fff',
        markers: []
    }
};
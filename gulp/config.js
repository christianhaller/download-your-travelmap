/*global module */
module.exports = {
    'autoprefixer': [
        'last 2 version',
        'safari 6',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
    ],
    'scripts': {
        'vendor': ['app/scripts/vendor/analytics.js',
            'bower_components/jquery/dist/jquery.js',
            'app/scripts/vendor/terrific.js',
            'app/scripts/vendor/jquery-jvectormap-1.2.2.min.js',
            'app/scripts/vendor/jquery-jvectormap-world-mill-en.js',
            'bower_components/nprogress/nprogress.js'
        ],
        'custom': ['app/scripts/custom/alert/alert.js',
            'app/scripts/custom/config.js',
            'app/scripts/custom/url-form/url-form.js',
            'app/scripts/custom/response/response.js',
            'app/scripts/custom/heartbeat/heartbeat.js',
            'app/scripts/custom/tracking/tracking.js',
            'app/scripts/custom/config.js',
            'app/scripts/custom/main.js'
        ]
    },
    'styles': ['app/styles/globals.scss',
        'app/styles/vendor/pure.css',
        'app/styles/vendor/pure-extras.css',
        'bower_components/nprogress/nprogress.css',
        'app/styles/svg-sprite.scss',
        'app/styles/url-form.scss',
        'app/styles/main.scss']
};

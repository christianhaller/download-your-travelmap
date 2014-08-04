'use strict';

var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    prettify = require('gulp-js-prettify'),
    rev = require('gulp-rev'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cssbeautify = require('gulp-cssbeautify'),
    csso = require('gulp-csso'),
    pngcrush = require('imagemin-pngcrush'),
    sass = require('gulp-ruby-sass'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    gzip = require('gulp-gzip'),
    size = require('gulp-size'),
    cssBase64 = require('gulp-css-base64'),
    buffer = require('gulp-buffer'),
    browserSync = require('browser-sync'),
    livereload = require('gulp-livereload'),

    assets = {
        'scripts': {
            'vendor': [
                'app/scripts/vendor/analytics.js',
                'app/scripts/vendor/jquery.js',
                'app/scripts/vendor/terrific-2.1.0.js',
                'app/scripts/vendor/jquery-jvectormap-1.2.2.min.js',
                'app/scripts/vendor/jquery-jvectormap-world-mill-en.js'
                //'app/scripts/vendor/countUp.js'

            ],
            'custom': [
                'app/scripts/custom/alert/alert.js',
                'app/scripts/custom/config.js',
                'app/scripts/custom/url-form/url-form.js',
                'app/scripts/custom/response/response.js',
                'app/scripts/custom/config.js',
                'app/scripts/custom/main.js'
            ]

        },
        'styles': [
            'app/styles/globals.scss',
            'app/styles/vendor/pure.css',
            'app/styles/vendor/pure-extras.css',
            'app/styles/svg-sprite.scss',
            'app/styles/url-form.scss',
            'app/styles/main.scss'
        ],
        'svg': fs.readFileSync('app/svg/svgsprite.svg'),
        'buildDate':'dev',
        'modernizr': fs.readFileSync('app/scripts/inline/modernizr.js', 'utf-8'),
        'analytics': fs.readFileSync('app/scripts/inline/analytics.js', 'utf-8')

    },

    allScripts = assets.scripts.vendor.concat(assets.scripts.custom);


gulp.task('rev', ['scripts', 'styles'], function () {
    return gulp.src(['build/styles/app.min.css', 'build/scripts/app.min.js'], {
        'base': 'dist'
    })
        .pipe(gulp.dest('build'))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
});


gulp.task('compile', ['rev'], function () {
    var manifest = JSON.parse(fs.readFileSync('dist/rev-manifest.json', 'utf8')),
        templateData = {
            'manifest': manifest,
            'assets': assets
        },
        handlebarOpts = {
            helpers: {
                assetPath: function (path, context) {
                    return ['', context.data.root.manifest[path]].join('/');
                }

            }


        };
    return gulp.src('./app/index.hbs')
        .pipe(handlebars(templateData, handlebarOpts))
        .pipe(handlebars({assets: assets}))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
});


gulp.task('dev', function () {
    gulp.start('dev-html', 'dev-js', 'dev-sass', 'dev-images');
});

gulp.task('dev-html', ['dev-sass', 'dev-js', 'php-script'], function () {
    assets.styles.css = [];
    assets.scripts = allScripts;

    // no sass files in html output
    for (var i = 0, len = assets.styles.length; i < len; i++) {
        assets.styles.css[i] = assets.styles[i].replace('scss', 'css');
    }

    return gulp.src('./app/index.hbs')
        .pipe(handlebars({
            'debug': true,
            'assets': assets
        }))
        .pipe(rename('index-dev.html'))
        .pipe(gulp.dest('./dist'));


});


gulp.task('dev-js', function () {
    return gulp.src(allScripts, {
        'base': './'
    })
        .pipe(gulp.dest('./dist/scripts/src'))
        .pipe(livereload({
            auto: false
        }));
});

gulp.task('php-script', function () {
    return gulp.src('app/php-script/**/*.*')
        .pipe(gulp.dest('./dist/php-script'));
});

gulp.task('dev-images', function () {
    return gulp.src('app/images/*.*')
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [
                {removeViewBox: false}
            ],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('dev-css', function () {
    return gulp.src(assets.styles, {
        'base': './'
    })
        .pipe(cssbeautify({
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
        }))
        .pipe(replace('../images', '../../../../images'))
        .pipe(gulp.dest('./dist/styles/src'))
});
gulp.task('dev-sass', ['dev-css'], function () {
    return gulp.src('dist/styles/src/app/styles/*.*')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/styles/src/app/styles'))

        .pipe(livereload({
            auto: false
        }));
});


gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts'], {
        read: false
    })
        .pipe(clean());
});


gulp.task('styles', ['clean'], function () {

    return gulp.src(assets.styles)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cssBase64({baseDir: '../images/', verbose: true,'maxWeightResource':70000}))
        .pipe(concat('app.css'))

        .pipe(gulp.dest('build/styles'))

        .pipe(rename({
            suffix: '.min'
        }))

        .pipe(csso())
        .pipe(minifycss())


        .pipe(gulp.dest('build/styles'))
});

gulp.task('jshint', function () {
    return gulp.src('./app/scripts/custom/**/*.js')
        // https://github.com/beautify-web/js-beautify#options
        .pipe(prettify({
            "indent_size": 4,
            "indent_char": " ",
            "indent_level": 0,
            "indent_with_tabs": false,
            "preserve_newlines": false,
            "max_preserve_newlines": 2,
            "jslint_happy": false,
            "brace_style": "collapse",
            "keep_array_indentation": false,
            "keep_function_indentation": false,
            "space_before_conditional": true,
            "break_chained_methods": false,
            "eval_code": false,
            "unescape_strings": false,
            "wrap_line_length": 0
        }))
        .pipe(jshint('config/.jshintrc'))
        .pipe(gulp.dest('./app/scripts/custom'));
});


gulp.task('scripts', function () {
    return gulp.src(allScripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build/scripts'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(size())
        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('minifyhtml', ['compile'], function () {
    gulp.src('./dist/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            'removeComments': true,
            'ignoreCustomComments': [
                /^\s+buildDate/,
                /buildDate\s+$/
            ]
        }))
        .pipe(gulp.dest('./dist'))
});


gulp.task('default', function () {
    gulp.start('clean', 'styles', 'scripts', 'rev', 'compile');
});

gulp.task('build', function () {
    assets.buildDate = new Date();
    gulp.start('minifyhtml', 'default');
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('app/**/*', ['dev']);
    livereload.listen();
});
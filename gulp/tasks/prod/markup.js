var gulp = require('gulp'),
    fs = require('fs'),
    handlebars = require('gulp-compile-handlebars'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    assets = require('../../config/assets.json');


gulp.task('markup',['styles','scripts'], function () {

    /*var manifest = JSON.parse(fs.readFileSync('dist/rev-manifest.json', 'utf8')),

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
        };*/


    assets.svg = fs.readFileSync('build/svg/defs.svg');
    buildDate= new Date();

    return gulp.src('./app/index.hbs')

        // manifest kram
        //.pipe(handlebars(templateData, handlebarOpts))


        .pipe(handlebars({
            'assets': assets,
            'buildDate':buildDate,
            'inline': true,
            'stylesheet': fs.readFileSync('build/styles/app.min.css', 'utf8'),
            'script': fs.readFileSync('build/scripts/app.min.js', 'utf8')
        }))
        .pipe(htmlmin({
            'collapseWhitespace': true,
            'removeComments': true,
            'ignoreCustomComments': [/^\s+buildDate/, /buildDate\s+$/, /^\s+svg/]
        }))
        // inline svg
        .pipe(replace('<!-- svg -->', assets.svg))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));
});
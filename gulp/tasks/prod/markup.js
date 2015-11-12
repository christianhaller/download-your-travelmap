/*global require*/
(function () {
    'use strict';
    var gulp = require('gulp'),
        fs = require('fs'),
        handlebars = require('gulp-compile-handlebars'),
        replace = require('gulp-replace'),
        rename = require('gulp-rename'),
        htmlmin = require('gulp-htmlmin'),
        assets = require('../../config/assets.json'),
        config = require('../../../config.json'),
        markup = function (env) {
            var buildDate = new Date(),
                fileName = config['aws'][env]['filename'];
            assets.svg = fs.readFileSync('build/svg/defs.svg');


            return gulp.src('./app/index.hbs')


                .pipe(handlebars({
                    'assets': assets,
                    'buildDate': buildDate,
                    'inline': true,
                    'path': config.aws[env].path,
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
                .pipe(rename(fileName))
                .pipe(gulp.dest('./dist'));

        };


    gulp.task('markup', ['styles', 'scripts'], function () {
        markup('prod');
        markup('stage');

    });
})();

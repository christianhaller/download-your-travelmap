/*global require, console*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        fs = require('fs'),
        handlebars = require('gulp-compile-handlebars'),
        rename = require('gulp-rename'),
        htmlmin = require('gulp-htmlmin'),
        argv = require('yargs').argv,
        url = require('url'),
        config = require('../../../config.json'),
        getHostname = function (path) {
            var parts = url.parse(path);
            return parts.hostname;
        },
        markup = function (env) {
            var build = {
                'date': new Date().toString(),
                'id': argv.buildId,
                'number': argv.buildNumber
            };
            console.log(getHostname(config.aws[env].path));
            return gulp.src('./app/index.hbs')
                .pipe(handlebars({
                    'buildDate': build.date,
                    'buildNumber': build.number || '',
                    'inline': true,
                    'buildId': build.id || '',
                    'path': config.aws[env].path,
                    'awsApiGatewayHostname': getHostname(config.aws[env].path),
                    'stylesheet': fs.readFileSync('build/styles/app.min.css', 'utf8'),
                    'script': fs.readFileSync('build/scripts/app.min.js', 'utf8')
                }))
                .pipe(htmlmin({
                    'collapseWhitespace': true,
                    'removeComments': true
                }))
                .pipe(rename('rrindex.html'))
                .pipe(gulp.dest('./dist'));

        };

    gulp.task('markup', ['styles', 'scripts'], function () {
        if (argv._[0] && argv._[0].indexOf('prod') !== -1) {
            console.log('prod');
            markup('prod');
        }
        else {
            console.log('stage');
            markup('stage');
        }
    });
}(require));

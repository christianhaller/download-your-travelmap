/*global require */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        gutil = require("gulp-util"),
        webpack = require("webpack"),
        rename = require('gulp-rename'),
        download = require('gulp-download'),
        bower = require('gulp-bower'),
        webpackConfig = require('../../../webpack.config.js'),
        uglify = require('gulp-uglify');

    gulp.task('download', function () {
        return download('http://www.google-analytics.com/analytics.js')
            .pipe(gulp.dest('app/scripts/vendor'));
    });

    gulp.task('bower', function () {
        return bower();
    });


    gulp.task('webpack',['download', 'bower'], function (callback) {
        // run webpack
        webpack(webpackConfig, function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
    });


    gulp.task('scripts', ['webpack'], function () {
        return gulp.src('./build/scripts/app.js')
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())

            .pipe(gulp.dest('./build/scripts'));
    });
}(require));

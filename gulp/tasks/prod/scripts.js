/*global require, __dirname*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        gutil = require("gulp-util"),
        webpack = require("webpack"),
        assets = require('../../config.json'),
        rename = require('gulp-rename'),
        download = require('gulp-download'),
        path = require('path'),
        bower = require('gulp-bower'),
        uglify = require('gulp-uglify');

    gulp.task('download', function () {
        return download('http://www.google-analytics.com/analytics.js')
            .pipe(gulp.dest('app/scripts/vendor'));
    });

    gulp.task('bower', function () {
        return bower();
    });


    gulp.task('scripts', function (callback) {
        // run webpack
        webpack({

            plugins: [
                new webpack.ProvidePlugin({
                    jQuery: 'jquery'


                })
            ],

            entry: './app/scripts/custom/main.js',
            resolve: {
                alias: {
                    jquery: path.join(__dirname + '../../../../bower_components/jquery/dist/jquery.js') ,
                    nprogress: path.join(__dirname + '../../../../bower_components/nprogress/nprogress.js') ,
                    vendor : path.join(__dirname + '../../../../app/scripts/vendor'),
                    config : path.join(__dirname + '../../../../app/scripts/custom/config.js')
            } },
            output: {
                filename: path.join(__dirname + '../../../../dist/scripts/app.min.js')
            }

        }, function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
    });


    gulp.task('old_scripts', ['download', 'bower'], function () {
        var allScripts = assets.scripts.vendor.concat(assets.scripts.custom);

        return gulp.src(allScripts)
            .pipe(concat('app.js')).pipe(gulp.dest('./build/scripts'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())

            .pipe(gulp.dest('./build/scripts'));
    });
}(require));

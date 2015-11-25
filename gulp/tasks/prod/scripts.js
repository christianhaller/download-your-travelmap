/*global require*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        assets = require('../../config.json'),
        rename = require('gulp-rename'),
        download = require('gulp-download'),
        bower = require('gulp-bower'),
        uglify = require('gulp-uglify');

    gulp.task('download', function () {
        return download('http://www.google-analytics.com/analytics.js')
            .pipe(gulp.dest('app/scripts/vendor'));
    });

    gulp.task('bower', function () {
        return bower();
    });

    gulp.task('scripts', ['download', 'bower'], function () {
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

/*global require*/
(function () {
    'use strict';
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        assets = require('../../config/assets.json'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify');


    gulp.task('scripts', function () {
        var allScripts = assets.scripts.vendor.concat(assets.scripts.custom);
        return gulp.src(allScripts)
            .pipe(concat('app.js')).pipe(gulp.dest('./build/scripts'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify())

            .pipe(gulp.dest('./build/scripts'));
    });
}());
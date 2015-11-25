/*global require*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        svgmin = require('gulp-svgmin'),
        svgcss = require('gulp-svg-css');

    gulp.task('svg', function () {
        return gulp
            .src('./app/svg/*.svg')
            .pipe(svgmin())
            .pipe(svgcss({
                fileName: 'icons',
                cssPrefix: 'icon-',
                addSize: false
            }))
            .pipe(gulp.dest('./build/styles'));
    });
}(require));

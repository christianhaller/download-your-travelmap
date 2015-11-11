/*global require*/
(function () {
    'use strict';
    var gulp = require('gulp'),
        svgSprite = require('gulp-svg-sprites');

    gulp.task('svgSprite', function () {
        return gulp.src('app/svg/*.svg')
            .pipe(svgSprite({mode: 'defs', preview: false}))
            .pipe(gulp.dest('build'));
    });
}());
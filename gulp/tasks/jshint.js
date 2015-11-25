/*global require*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        jshint = require('gulp-jshint');

    gulp.task('jshint', function () {
        return gulp.src(['gulp/**/*','backend/**/*','!backend/node_modules/**','app/scripts/custom/**/*'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });
}(require));

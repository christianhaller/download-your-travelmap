/*global require*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        del = require('del');

    gulp.task('clean', function () {
        return del(['./build', './bower_components', './dist/styles', './dist/scripts']);
    });
}(require));

/*global require*/
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        assets = require('../../config.json'),
        config = require('../../../backend/config.json'),
        rename = require('gulp-rename'),
        csso = require('gulp-csso'),
        please = require('gulp-pleeease'),
        minifycss = require('gulp-minify-css'),
        concat = require('gulp-concat'),
        sass = require('gulp-sass');

    gulp.task('styles', ['svg'], function () {
        return gulp.src(assets.styles)
            // 1 . SASS
            .pipe(sass())
            // 2. autoprefixing
            .pipe(please(config.please))

            // 4. concat them all
            .pipe(concat('app.css'))

            .pipe(gulp.dest('build/styles'))
            .pipe(rename({
                suffix: '.min'
            }))
            // 5. optimize
            .pipe(csso())
            // 6. minify
            .pipe(minifycss())
            // 7. save to app.min.css
            .pipe(gulp.dest('build/styles'));
    });
}(require));

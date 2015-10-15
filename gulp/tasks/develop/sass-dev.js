var gulp = require('gulp'),
    config = require('../../../config.json'),
    autoprefixer = require('gulp-autoprefixer'),

    concat = require('gulp-concat'),
    sass = require('gulp-sass');


gulp.task('sass-dev', function () {
    return gulp.src('dist/styles/src/app/styles/*.*')
        .pipe(sass())
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest('dist/styles/src/app/styles'));
});
var gulp = require('gulp'),
    config = require('../../config/config.json'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass');


gulp.task('sass-dev', function () {
    return gulp.src('dist/styles/src/app/styles/*.*')
        .pipe(sass())
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest('dist/styles/src/app/styles'));


    /*

     .pipe(livereload({
     auto: false
     }));

     */
});
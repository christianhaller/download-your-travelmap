var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    prettify = require('gulp-js-prettify'),
    config = require('../../config/config.json');


gulp.task('jshint', function () {
    console.log(config);
    return gulp.src('app/scripts/custom/**/*.js')
        // https://github.com/beautify-web/js-beautify#options
        .pipe(prettify(config.prettify))
        .pipe(jshint('./gulp/config/jshintrc.json'))
        .pipe(gulp.dest('./app/scripts/custom'));
});
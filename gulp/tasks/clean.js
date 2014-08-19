var gulp = require('gulp'),
    clean = require('gulp-clean');
    gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts'], {
        read: false
    }).pipe(clean());
});
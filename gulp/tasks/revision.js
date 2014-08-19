/*

var gulp = require('gulp'),
    rev = require('gulp-rev');


gulp.task('revision', function () {
    return gulp.src(['build/styles/app.min.css', 'build/scripts/app.min.js'], {
        'base': 'dist'
    })
        .pipe(gulp.dest('build'))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
});

*/
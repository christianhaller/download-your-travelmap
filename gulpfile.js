var gulp = require('gulp');

var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');


gulp.task('styles', function() {
  return gulp.src('src/css/*')

    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('default', function () {
    return gulp.src(
            [
                'src/js/jquery-1.11.1.min.js',
                'src/js/jquery-jvectormap-1.2.2.min.js',
                'src/js/jquery-jvectormap-world-mill-en.js',
                'src/js/custom.js'
                //'/path/to/mymodule/mymodule/*.js'
            ]

        )
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(notify({ message: 'Scripts task complete' }));





});
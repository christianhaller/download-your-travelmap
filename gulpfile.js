var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    prettify = require('gulp-js-prettify');


gulp.task('styles', function () {
    return gulp.src(['src/css/pure.css', 'src/css/custom.css'])

        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
    return gulp.src(
            [
                'src/js/jquery.js',
                'src/js/foundation.js',
                'src/js/jquery-jvectormap-1.2.2.js',
                'src/js/jquery-jvectormap-world-mill-en.js',
                'src/js/custom.js'
            ]
        )

        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(notify({ message: 'Scripts task complete' }));


});
gulp.task('jshint', function () {
    return gulp.src(
            [
                'src/js/custom.js'
            ]
        ).pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'JSHINT task complete' }));
});




gulp.task('prettify', function() {
  gulp.src('src/js/custom.js')
    .pipe(prettify({"indent_size": 4,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0}))
    .pipe(gulp.dest('src/js')); // edit in place
});


gulp.task('default', function () {
    gulp.start('styles','prettify', 'jshint', 'scripts');
});

gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/css/*.css', ['styles']);

    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts', 'jshint']);


});
var gulp = require('gulp'),
    assets = require('../../config/assets.json'),
    config = require('../../config/config.json'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    prefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    cssBase64 = require('gulp-css-base64'),
    sass = require('gulp-ruby-sass');


gulp.task('styles', function () {
    return gulp.src(assets.styles)
        // 1 . SASS
        .pipe(sass())
        // 2. autoprefixing
        .pipe(prefix(config.autoprefixer))
        // 3. replace Images with base64 data-uri

        /*
        .pipe(cssBase64({
            baseDir: '../images/',
            verbose: true,
            'maxWeightResource': 70000
        }))

        */
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
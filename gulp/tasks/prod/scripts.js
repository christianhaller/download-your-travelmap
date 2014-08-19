var gulp = require('gulp'),
    concat = require('gulp-concat'),
    assets = require('../../config/assets.json'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');




gulp.task('scripts', function () {
    var allScripts = assets.scripts.vendor.concat(assets.scripts.custom);
    return gulp.src(allScripts)

        //.pipe(sourcemaps.init())

        .pipe(concat('app.js')).pipe(gulp.dest('./build/scripts'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())

        //.pipe(sourcemaps.write())
        //.pipe(size())

        .pipe(gulp.dest('./build/scripts'));
});
var gulp = require('gulp'),
    replace = require('gulp-replace'),
    assets = require('../../config/assets.json');

gulp.task('styles-dev',['sass-dev'], function () {
    console.log('styles-dev');
    return gulp.src(assets.styles, {
        'base': './'
    })
        // replace paths
        .pipe(replace('../images', '../../../../images'))
        // copy
        .pipe(gulp.dest('./dist/styles/src'));
});
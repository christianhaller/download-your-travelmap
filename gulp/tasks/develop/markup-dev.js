var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    fs = require('fs'),
    handlebars = require('gulp-compile-handlebars'),
    assets = require('../../config/assets.json');


gulp.task('markup-dev',['svgSprite'], function () {
    assets.styles.css = [];

    assets.svg = fs.readFileSync('build/svg/defs.svg');
    assets.scripts = assets.scripts.vendor.concat(assets.scripts.custom);

    buildDate= new Date();

    // no sass files in html output
    for (var i = 0, len = assets.styles.length; i < len; i++) {
        assets.styles.css[i] = assets.styles[i].replace('scss', 'css');
    }

    return gulp.src('./app/index.hbs')
        .pipe(handlebars({
            'debug': true,
            'assets': assets,
            'buildDate':buildDate

        }))
        // inline svg
        .pipe(replace('<!-- svg -->', assets.svg))
        // save to index-dev.html
        .pipe(rename('index-dev.html'))
        .pipe(gulp.dest('./dist'));
});




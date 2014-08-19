var gulp = require('gulp'),
    assets = require('../../config/assets.json');

gulp.task('scripts-dev', function () {
    var allScripts = assets.scripts.vendor.concat(assets.scripts.custom);

    return gulp.src(allScripts, {
        'base': './'
    })
        .pipe(gulp.dest('./dist/scripts/src'));

        /*
        pipe(livereload({

            auto: false
        }));
        */
});
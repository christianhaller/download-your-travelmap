var gulp = require('gulp'),

    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush');


gulp.task('images-dev', function () {
    return gulp.src('app/images/*.*')
        /*
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [
                {
                    removeViewBox: false
                }
            ],
            use: [pngcrush()]
        }))
        */
        .pipe(gulp.dest('./dist/images'));
});



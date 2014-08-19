var gulp = require('gulp'),
    zopfli = require('gulp-zopfli');


gulp.task('zopfli',[
//    'compress-js',
//    'compress-css',
    'compress-html'
]);

/* inlined, not necessary */
gulp.task('compress-js', function() {
    gulp.src('dist/scripts/*.js')
        .pipe(zopfli())
        .pipe(gulp.dest('dist/scripts'));
});
/* inlined, not necessary */
gulp.task("compress-css", function() {
    gulp.src("dist/styles/*.css")
        .pipe(zopfli())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("compress-html",['markup'], function() {
    gulp.src('dist/*.html')
        .pipe(zopfli())
        .pipe(gulp.dest('dist'));
});
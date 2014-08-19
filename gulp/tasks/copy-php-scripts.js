var gulp = require('gulp');

gulp.task('copy-php-scripts', function () {
    return gulp.src('app/php-script/**/*.*').pipe(gulp.dest('./dist/php-script'));
});
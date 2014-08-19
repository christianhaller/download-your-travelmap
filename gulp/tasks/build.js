var gulp = require('gulp');

gulp.task('build', ['scripts', 'styles', 'markup','copy-php-scripts','zopfli','svgSprite']);



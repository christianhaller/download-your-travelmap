var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    prettify = require('gulp-js-prettify'),
    rev = require('gulp-rev'),
    htmlmin = require('gulp-htmlmin'),
    cssbeautify = require('gulp-cssbeautify'),
    clean = require('gulp-clean'),
    buffer = require('gulp-buffer'),
    livereload = require('gulp-livereload');


gulp.task('rev', ['scripts', 'styles'], function () {
    // by default, gulp would pick `assets/css` as the base,
    // so we need to set it explicitly:
    return gulp.src(['dist/styles/*.css', 'dist/scripts/*.js'], {'base': 'dist'})
        .pipe(gulp.dest('dist'))
        .pipe(rev())
        .pipe(gulp.dest('dist'))

        .pipe(rev.manifest())
        .pipe(gulp.dest('dist')); // write manifest to build dir
});


gulp.task('compile', ['rev'], function () {
    var manifest = JSON.parse(fs.readFileSync('dist/rev-manifest.json', 'utf8'));

    handlebarOpts = {
        helpers: {
            assetPath: function (path, context) {
                return ['', context.data.root[path]].join('/');
            }
        }
    };


    // read in our handlebars template, compile it using
    // our manifest, and output it to index.html
    return gulp.src('./app/index.hbs')
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({
            message: 'Compile task complete'
        }));
});

gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts'], {read: false})
        .pipe(clean());
});

gulp.task('styles', ['clean'], function () {

    /*gulp.src('src/css/custom.css')
     .pipe(cssbeautify({
     indent: '  ',
     autosemicolon: true
     }))
     .pipe(gulp.dest('src/css/'));*/


    return gulp.src(['app/styles/vendor/pure.css', 'app/styles/vendor/pure-extras.css', 'app/styles/main.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('app.min.css'))

        /*

         .pipe(gulp.dest('dist/styles'))
         .pipe(rename({
         suffix: '.min'
         }))

         */
        .pipe(minifycss())

        .pipe(gulp.dest('dist/styles'))
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/main.js')
        // https://github.com/beautify-web/js-beautify#options
        .pipe(prettify({
            "indent_size": 4,
            "indent_char": " ",
            "indent_level": 0,
            "indent_with_tabs": false,
            "preserve_newlines": false,
            "max_preserve_newlines": 2,
            "jslint_happy": false,
            "brace_style": "collapse",
            "keep_array_indentation": false,
            "keep_function_indentation": false,
            "space_before_conditional": true,
            "break_chained_methods": false,
            "eval_code": false,
            "unescape_strings": false,
            "wrap_line_length": 0
        }))
        .pipe(jshint('config/.jshintrc'))
        .pipe(gulp.dest('app/scripts'));
});


gulp.task('scripts', function () {


    return gulp.src(
            [
                'app/scripts/vendor/jquery.js',
                'app/scripts/vendor/jquery-jvectormap-1.2.2.min.js',
                'app/scripts/vendor/jquery-jvectormap-world-mill-en.js',
                'app/scripts/vendor/countUp.js',
                'app/scripts/main.js'
            ]
        )
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));


});

gulp.task('minifyhtml',['compile'], function() {
  gulp.src('./dist/*.html')
    .pipe(htmlmin({collapseWhitespace: true,'removeComments':true}))
    .pipe(gulp.dest('./dist'))
});


gulp.task('default', function () {
    gulp.start('clean', 'styles', 'scripts', 'rev', 'compile');
});

gulp.task('build', function () {
    gulp.start('minifyhtml','default');
});

gulp.task('watch', function () {

    // Watch .css files
    gulp.watch('app/styles/*.css', ['default']);

    // Watch .js files
    gulp.watch('app/scripts/*.js', ['default']);

    /*    // Create LiveReload server
     var server = livereload();

     // Watch any files in dist/, reload on change
     gulp.watch(['src*/
    /*.*']).on('change', function (file) {

     server.changed(file.path);
     });*/


});
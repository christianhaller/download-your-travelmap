/*global require */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        awspublish = require('gulp-awspublish'),
        zopfli = require('gulp-zopfli'),
        config = require('../../../config'),
        deploy = function (env) {
            var conf = config.aws[env],
                publisher = awspublish.create({
                    region: conf.s3.region,
                    'params': {
                        Bucket: conf.s3.bucketName
                    }
                },{
                    cacheFileName: 's3cache/'+env+'.json'
                }),
                headerForever = {
                    'Cache-Control': 'max-age=31536000, no-transform, public, must-revalidate',
                    'Content-Encoding': 'gzip'

                },
                headerIndex = {
                    'Cache-Control': 'max-age=3600, no-transform, public, must-revalidate',
                    'Content-Encoding': 'gzip',
                    'Content-Type': 'text/html; charset=UTF-8'
                    // 'x-frame-options': 'SAMEORIGIN'
                };


            gulp.src(['./app/robots.txt', './app/favicon.ico'])
                .pipe(zopfli({'append': false}))
                .pipe(publisher.publish(headerForever, {
                    'force': true
                }))
                .pipe(awspublish.reporter({}));

            return gulp.src(['./dist/index.html'])
                .pipe(zopfli({'append': false}))

                .pipe(publisher.publish(headerIndex, {
                    'force': true
                }))
                .pipe(publisher.cache())
                .pipe(awspublish.reporter({}));
        };

    gulp.task('deploy_prod', ['clean', 'default'], function () {
        deploy('prod');

    });


    gulp.task('deploy_stage', ['default'], function () {
        deploy('stage');
    });
}(require));

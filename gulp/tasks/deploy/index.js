/*global require */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        awspublish = require('gulp-awspublish'),
        zopfli = require("gulp-zopfli"),
        config = require('../../../config.json'),
        deploy = function (config) {
            var publisher = awspublish.create({
                    region: config.s3.region,
                    'params': {
                        Bucket: config.s3.bucketName
                    }
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
                .pipe(zopfli({'append':false}))
                .pipe(publisher.publish(headerForever))
                .pipe(awspublish.reporter({}));

            return gulp.src(['./dist/index.html'])
                .pipe(zopfli({'append':false}))

                .pipe(publisher.publish(headerIndex))
                .pipe(awspublish.reporter({}));
        };

    gulp.task('deploy_prod', ['default'], function () {
        config = config.aws.prod;
        deploy(config);

    });



    gulp.task('deploy_stage', ['default'], function () {
        config = config.aws.stage;
        deploy(config);
    });
}(require));

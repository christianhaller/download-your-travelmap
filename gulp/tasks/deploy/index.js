/*global require */
(function () {
    'use strict';
    var gulp = require('gulp'),
        lambda = require('gulp-awslambda'),
        awspublish = require("gulp-awspublish"),
        zip = require('gulp-zip'),
        config = require('../../../backend/config.json'),
        deploy = function (config) {
            var publisher = awspublish.create({
                    region: config.s3.region,
                    'params': {
                        Bucket: config.s3.bucketName
                    }
                }),
                headers = {
                    'Cache-Control': 'max-age=3600, no-transform, public, must-revalidate',
                    'Content-Encoding': 'gzip'
                };
            gulp.src('./backend/**/*')
                .pipe(zip('archive.zip'))
                .pipe(lambda(config.lambda, config));

            return gulp.src(['./dist/' + config.filename, './app/robots.txt'])
                .pipe(awspublish.gzip({}))
                .pipe(publisher.publish(headers))
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
}());

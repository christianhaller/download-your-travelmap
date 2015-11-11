/*global require,process */
(function () {
    'use strict';
    var gulp = require('gulp'),
        lambda = require('gulp-awslambda'),
        fs = require('fs'),
        awspublish = require("gulp-awspublish"),
        zip = require('gulp-zip'),
        config = require('../../../config.json');

    gulp.task('lambda', function () {


        return gulp.src('./backend/**/*')
            .pipe(zip('archive.zip'))
            .pipe(lambda(config.aws.lambda, config.aws))
    });

    gulp.task('s3', function () {
        var publisher = awspublish.create({
                region: config.aws.s3.region,
                'params': {
                    Bucket: config.aws.s3.bucketName

                }
            }),
            headers = {
                'Cache-Control': 'max-age=315360000, no-transform, public',
                'Content-Encoding': 'gzip'
            };

        return gulp.src(['./dist/index.html', './app/robots.txt'])
            .pipe(awspublish.gzip({}))
            .pipe(publisher.publish(headers))
            .pipe(awspublish.reporter({}));
    });
}());

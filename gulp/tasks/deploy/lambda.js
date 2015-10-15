var gulp = require('gulp'),
	lambda = require('gulp-awslambda'),
	fs = require('fs'),
	awspublish = require("gulp-awspublish"),
	zip = require('gulp-zip'),

	aws = JSON.parse(fs.readFileSync('./aws-credentials.json'));


gulp.task('lambda', function () {
	return gulp.src('./app/node-script/**/*')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params, aws))
});


gulp.task('s3', function() {
	'use strict';
	var publisher = awspublish.create({
            region: 'us-west-2',
            'params': {
                Bucket: 'download-your-travelmap.christianhaller.com'

		}
	}),
    headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public',
        'Content-Encoding':'gzip'
    };


	return gulp.src('./dist/index.html')
        .pipe(awspublish.gzip({}))
        .pipe(publisher.publish(headers))
		.pipe(awspublish.reporter({}));
});
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
		params: {
			Bucket: 'travelmap'
		}
	});


	return gulp.src('./dist/index.html')
		// gzip, Set Content-Encoding headers and add .gz extension
		//.pipe(awspublish.gzip({ ext: '.gz' }))
		.pipe(publisher.publish())
		// publisher will add Content-Length, Content-Type and headers specified above
		// If not specified it will set x-amz-acl to public-read by default
		//.pipe(publisher.publish(headers))

		// create a cache file to speed up consecutive uploads
		//.pipe(publisher.cache())

		// print upload updates to console
		.pipe(awspublish.reporter());
});
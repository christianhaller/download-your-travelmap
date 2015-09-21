var gulp = require('gulp'),
	lambda = require('gulp-awslambda'),
	fs = require('fs'),
	zip = require('gulp-zip'),

	aws = JSON.parse(fs.readFileSync('./aws-credentials.json'));


gulp.task('lambda', function () {
	return gulp.src('./app/node-script/*.js')
		.pipe(zip('archive.zip'))
		.pipe(lambda(aws.lambda_params, aws))
});
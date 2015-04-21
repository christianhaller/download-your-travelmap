var gulp = require('gulp'),
	psi = require('psi');
gulp.task('psi-desktop', function () {
	return psi('http://download-your-travelmap.christianhaller.com', {
		nokey: 'true',
		'locale':'de',
		'threshold':101,
		strategy: 'desktop'
	}, function (err, data) {
		console.log(data.score);
		console.log(data.pageStats);
	});
});
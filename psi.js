
	psi = require('psi');

// get the PageSpeed Insights report
psi('http://download-your-travelmap.christianhaller.com', {'locale':'de','strategy':'desktop','threshold':100},function (err, data) {
	console.log(data.score);
	console.log(data.pageStats);
});


/*
// output a formatted report to the terminal
psi.output('html5rocks.com', function (err) {
	console.log('done');
});
*/
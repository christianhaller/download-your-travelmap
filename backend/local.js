/*global require */
(function (require) {
	require('./index').handler({'url': 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2FCarolinaCoopers'}, {'succeed': function (data) {
		console.log('succeed');
	}, fail: function (err) {
		console.log('err');
		console.log(err);
	}});
})(require);



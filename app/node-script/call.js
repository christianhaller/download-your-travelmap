require('./magic').handler({'url':'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller'},{'succeed':function(data){
	console.log(data);
}});
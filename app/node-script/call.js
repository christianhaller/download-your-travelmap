require('./index').handler({'url':'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2FCarolinaCoopers'},{'succeed':function(data){
	console.log('succeed');
},fail:function(err){
    console.log(err);
}});

/*
require('./magic').handler({'url':'http%3A%2F%2Fwww.tripadvisor.com%2FTravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693'},{'succeed':function(data){
	//console.log(data);
}});
*/


var tokml = require('tokml'),
    GeoJSON = require('geojson');
    module.exports = function (map) {
    var json = GeoJSON.parse(map.places, {Point: ['lat', 'lng'],include: ['name']});
    return tokml(json, {
        name: 'name',
            documentName: map.username+'\'s travelmap',
            documentDescription: 'I have been to '+ map.places.length+' cities'
        });
};
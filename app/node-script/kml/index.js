var fs = require('fs'),
    tokml = require('tokml'),
    GeoJSON = require('geojson');
module.exports = function (data) {
    var map = JSON.parse(fs.readFileSync('../../../test/dummy.json')),
        kmlDocumentName = tokml(GeoJSON.parse(map.places, {Point: ['lat', 'lng']}), {
            documentName: 'My Travelmap',
            documentDescription: 'I have been to '+ map.places.length+' places'
        });
    return kmlDocumentName;
}();
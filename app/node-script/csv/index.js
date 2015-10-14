var json2csv = require('json2csv'),
    Promise = require('promise'),
    fields = ['lat', 'lon', 'name', 'been'];

   /* upload = function (filename, csv, cb) {
        compress(csv).then(function(data){
            var params = {
                    Bucket: bucketName,
                    Key: 'csv/' + filename,
                    Body: data,
                    ACL: 'public-read',
                    ContentEncoding: 'gzip',
                    ContentType: 'text/csv'
                },

                upload = new AWS.S3.ManagedUpload({params: params});
            upload.send(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                    cb(data.Location);
                }
            });
        });


    };*/

module.exports = function (data) {
    return new Promise(function (fulfill,reject) {
    var map = [];
        data.places.forEach(function (item) {
            item.been = item.flags.join(',');
            item.lon = item.lng;
            map.push(item);
        });

        json2csv({data: map, fields: fields}, function (err, csv) {
            if (err) {

                console.log('err');
                reject(err);

            }
            else {
                console.log('ok');
                fulfill(csv);
            }

        });
    });
};



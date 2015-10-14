var AWS = require('aws-sdk'),
    Promise = require('promise'),

    bucketName = 'travelmap';

module.exports = function (filename, content, contentType, contentEncoding) {
    return new Promise(function (fulfill, reject) {
        'use strict';
        var params = {
                ACL: 'public-read',
                Bucket: bucketName,
                Key: filename,
                'ContentEncoding': contentEncoding,
                'ContentType': contentType,
                Body: content
            },

            upload = new AWS.S3.ManagedUpload({params: params});
        upload.send(function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                console.log(filename+' uploaded');
                fulfill(data);
            }
        });
    });
};

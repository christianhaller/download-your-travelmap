var AWS = require('aws-sdk'),
    sanitize = require('sanitize-filename'),
    Promise = require('promise'),
    bucketName = 'travelmap';

module.exports = function (dir, filename, content, contentType, contentEncoding) {
    filename = dir + '/' + sanitize(filename);
    //AWS.config.loadFromPath('./aws.json');


    if(typeof process.env.key !== 'undefined' && typeof process.env.secret !== 'undefined'){
        console.log('Eeeeeeee');
        AWS.config.accessKeyId = process.env.key;
        AWS.config.secretAccessKey = process.env.secret;
        AWS.config.region = 'us-east-1';
    }


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
                console.log(data.Location + ' uploaded');
                fulfill(data.Location);
            }
        });
    });
};

/*global require, module, process */
(function () {
    'use strict';
    var AWS = require('aws-sdk'),
        sanitize = require('sanitize-filename'),
        Promise = require('promise');

    module.exports = function (dir, filename, content, contentType, contentEncoding) {
        // TODO merge config /Users/christianhaller/Desktop/download-your-travelmap/config.json
        var config = {
            "aws": {
                "s3": {
                    // /Users/christianhaller/Desktop/download-your-travelmap/backend/upload/index.js
                    "bucketName": "download-your-travelmap.christianhaller.com",
                    "region": "us-west-2"
                }

            }
        };
        filename = dir + '/' + sanitize(filename);

        AWS.config.region = config.aws.s3.region;
        return new Promise(function (fulfill, reject) {
            var params = {
                    'ACL': 'public-read',
                    'Bucket': config.aws.s3.bucketName,
                    'Key': filename,
                    'ContentEncoding': contentEncoding,
                    'ContentType': contentType,
                    'Body': content
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
}());


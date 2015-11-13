/*global require, module */
(function () {
    'use strict';
    var AWS = require('aws-sdk'),
        sanitize = require('sanitize-filename'),
        Promise = require('promise'),
        config = require('../config.json');

    module.exports = function (dir, filename, content, contentType, contentEncoding) {



        filename = dir + '/' + sanitize(filename);



        AWS.config.region = config.aws.prod.s3.region;
        return new Promise(function (fulfill, reject) {
            var params = {
                    'ACL': 'public-read',
                    'Bucket': config.aws.prod.s3.bucketName,
                    'Key': filename,
                    'ContentEncoding': contentEncoding,
                    'ContentType': contentType,
                    'Body': content
                },

                upload = new AWS.S3.ManagedUpload({params: params});
            upload.send(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    fulfill(data.Location);
                }
            });
        });
    };
}());


/*global require*/
(function (require) {
    'use strict';
    var AWS = require('aws-sdk'),
        config = require('./config.json'),
        cloudfront = new AWS.CloudFront(),
        params = {
            DistributionId: config.aws.prod.DistributionId,
            InvalidationBatch: {
                CallerReference: '' + Date.now(),
                Paths: {
                    Quantity: 3,
                    Items: [
                        '/index.html',
                        '/favicon.ico',
                        '/robots.txt'
                    ]
                }
            }
        };
    cloudfront.createInvalidation(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);

        }
        else {
            console.log(data)
        }
    });
}(require));

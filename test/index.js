/*global require, process*/
(function (require, process) {
    'use strict';
    var childProcess = require('child_process'),
        ls,
        host = 'http://stage.download-your-travelmap.christianhaller.com/',
        failure = [];

    if(process.argv[2] === 'local'){
        host = 'http://localhost:8080'
    }

    ls = childProcess.exec('casperjs test test/test.js --ignore-ssl-errors=true --ssl-protocol=any --engine=slimerjs --url=' + host);
    ls.stdout.on('data', function (data) {
        console.log(data);
        if (data.indexOf('FAIL') === 10) {

            failure.push(data);
        }
    });


    ls.on('exit', function () {
        if (failure.length > 0) {
            console.log('💩💩💩💩💩💩');
            process.exit(1);
        }
        else {
            console.log('SUCCESS! 🎉🎉🎉🎉🎉🎉');
            process.exit();
        }
    });
})(require, process);


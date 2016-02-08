/*global require, process*/
(function (require, process) {
    'use strict';
    var childProcess = require('child_process'),
        ls,
        failure = [];

    ls = childProcess.exec('casperjs test test/test.js --jsconsole --engine=slimerjs --url=http://localhost:8080 --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes');
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


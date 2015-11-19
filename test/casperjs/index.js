/*global casper, console */
(function (casper) {
    'use strict';
    var tripAdvisorProfileUrl = 'http://www.tripadvisor.com/members/christianhaller',
        stageUrl = 'http://stage.download-your-travelmap.christianhaller.com/',
        jsErrors = [];

    casper.options.viewportSize = {width: 1600, height: 950};
    casper.on("resource.error", function (resourceError) {
        console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
        console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    });

    casper.on("page.error", function (msg, trace) {
        this.echo('Error:    ' + msg, 'ERROR');
        this.echo('file:     ' + trace[0].file, 'WARNING');
        this.echo('line:     ' + trace[0].line, 'WARNING');
        this.echo('function: ' + trace[0]['function'], 'WARNING');
        jsErrors.push(msg);
    });

    casper.test.begin('basic functions', function (test) {


        casper.start(stageUrl, function () {

            test.assertResourceExists(function (resource) {
                return resource.url.match('http://www.google-analytics.com/r/collect');
            }, 'Google Analytics');


            this.fill('.url-form', {url: 'http://www.google.com'}, true);
            test.assertExists('#url.error', 'form validation');


            this.fill('.url-form', {url: tripAdvisorProfileUrl}, true);

            this.waitForUrl(stageUrl + '?url=' + tripAdvisorProfileUrl, function () {
                console.log(this.getCurrentUrl());
                test.assertEquals(this.fetchText('.js-username'), 'christianhaller', 'name');
            }, function () {
            }, 9009);
        });


        casper.run(function () {
            if (jsErrors.length > 0) {
                this.echo(jsErors.length + ' Javascript errors found', 'WARNING');
            } else {
                this.echo(jsErrors.length + ' Javascript errors found', 'INFO');
            }

            test.done();
        });
    });

}(casper));


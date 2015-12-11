/*global casper, console */
(function (casper) {
    'use strict';
    var tripAdvisorProfileUrl = 'http://www.tripadvisor.com/members/christianhaller',
        url = casper.cli.get('url'),
        jsErrors = [];

    casper.options.viewportSize = {width: 1600, height: 950};
    casper.on("resource.error", function (resourceError) {
        console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
        console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    });

    casper.on('page.error', function (msg, trace) {
        this.echo('Error:    ' + msg, 'ERROR');
        this.echo('file:     ' + trace[0].file, 'WARNING');
        this.echo('line:     ' + trace[0].line, 'WARNING');
        this.echo('function: ' + trace[0]['function'], 'WARNING');
        jsErrors.push(msg);
    });

    casper.test.begin('basic functions '+ url, function (test) {


        casper.start(url, function () {

            test.assertResourceExists(function (resource) {
                return resource.url.match('http://www.google-analytics.com/r/collect');
            }, 'Google Analytics');


            this.fill('.url-form', {url: 'http://www.google.com'}, true);
            test.assertExists('#url.error', 'form validation');


            this.fill('.url-form', {url: tripAdvisorProfileUrl}, true);

            this.waitForUrl(url + '?url=' + tripAdvisorProfileUrl, function () {
                test.assertEquals(this.fetchText('.js-username'), 'christianhaller', 'name');
            }, function () {
            }, 9009);
        });


        casper.run(function () {
            test.assertEquals(jsErrors.length, 0, 'no js errors');

            test.done();
        });
    });

}(casper));


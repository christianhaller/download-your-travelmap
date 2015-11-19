/*global casper, console */
(function (casper) {
    'use strict';
    var tripAdvisorProfileUrl = 'http://www.tripadvisor.com/members/christianhaller',
        stageUrl = 'http://stage.download-your-travelmap.christianhaller.com/';

    casper.options.viewportSize = {width: 1600, height: 950};
    casper.on("resource.error", function (resourceError) {
        console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
        console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    });


    casper.test.begin('basic functions', function (test) {


        casper.start(stageUrl, function () {

            this.fill('.url-form', { url: tripAdvisorProfileUrl }, true);
            this.waitForUrl(stageUrl + '?url=' + tripAdvisorProfileUrl, function () {
                console.log(this.getCurrentUrl());
                test.assertEquals(this.fetchText('.js-username'), 'christianhaller', 'name');
            }, function () {
            }, 9009);


        });


        casper.run(function () {
            test.done();
        });
    });

}(casper));


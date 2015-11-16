/*global casper */
(function (casper) {
    'use strict';
    var tripAdvisorProfileUrl = 'http://www.tripadvisor.com/members/christianhaller',
        stageUrl = 'http://stage.download-your-travelmap.christianhaller.com/';
    casper.options.waitTimeout = 20000;
    casper.on('page.resource.requested', function (requestData, request) {
        // https://github.com/ariya/phantomjs/issues/12181
        var url = requestData.url.replace('https', 'http');
        request.changeUrl(url);

    });

    casper.test.begin('basic functions', function (test) {

        casper.start(stageUrl, function () {
            this.fill('.url-form', {
                'url': tripAdvisorProfileUrl
            }, true);

            this.waitForUrl(stageUrl + '?url=' + tripAdvisorProfileUrl, function () {
                test.comment(this.getCurrentUrl());
                test.assertEquals(this.fetchText('.js-username'), 'christianhaller', 'name');
            });

        });
        casper.run(function () {
            test.done();
        });
    });

}(casper));


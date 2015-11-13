/*global casper */
(function (casper) {
    'use strict';
    var url = 'http://www.tripadvisor.com/members/christianhaller';
    casper.options.viewportSize = {width: 1600, height: 950};

    casper.test.begin('basic functions', function suite(test) {

        casper.start('http://stage.download-your-travelmap.christianhaller.com/', function () {
            casper.fill('.url-form', {
                'url': url
            }, true);

        }).waitForUrl('http://stage.download-your-travelmap.christianhaller.com/?url='+url, function () {
            test.assertEvalEquals(function () {
                return $('.js-username').text();
            }, 'christianhaller', 'correct name');
            this.echo('redirected to login.html');
        },10000);


        casper.run(function () {
            test.done();
        });
    });

}(casper));


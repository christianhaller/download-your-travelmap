/*global casper */
(function (casper) {
    'use strict';
    var url = 'http://www.tripadvisor.com/members/christianhaller';
    casper.options.viewportSize = {width: 1600, height: 950};

    casper.test.begin('basic functions', function (test) {

        casper.start('http://stage.download-your-travelmap.christianhaller.com/', function () {
            this.echo(this.getCurrentUrl());
            this.fill('.url-form', {
                'url': url
            }, true);

            this.wait(10000, function() {
                this.echo("I've waited for ten seconds.");
                this.echo(this.getCurrentUrl());
                test.assertEvalEquals(function () {
                    return $('.js-username').text();
                }, 'christianhaller', 'correct name');
            });



        });


        casper.run(function () {
            test.done();
        });
    });

}(casper));


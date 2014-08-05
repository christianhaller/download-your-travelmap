var url = 'http://localhost/',
    utils = require('utils'),
    siteName = 'download-your-travelmap',
    tripAdvisorUrl = 'http://www.tripadvisor.com/members/christianhaller',
    badTripAdvisorUrl = 'http://www.tripadvisor.com/members/christianhallerrrrrrrrrr',
    data,
    ajaxUrl = '/magic',
    params = {'url':tripAdvisorUrl};



casper.start(url, function () {
    this.echo(this.getTitle());

    documentHeight = this.evaluate(function () {
        return __utils__.getDocumentHeight();
    });
    this.echo('Document height is ' + documentHeight + 'px');

    this.test.assertExists(
        'form[action="/magic"]',
        siteName + ' has a form with action "/magic"'
    );

    data = this.evaluate(function (ajaxUrl) {
        return JSON.parse(__utils__.sendAJAX(ajaxUrl, 'POST', null, false));
    }, {ajaxUrl: ajaxUrl});

});


casper.then(function () {
    //require('utils').dump(data);
    this.test.assertEquals(data.status, 'error','500er wird geworfen');



});

casper.thenOpen('http://localhost/magic',
    {
        method: 'post',
        data:   {
            'url': tripAdvisorUrl
        }},

    function(response) {

    utils.dump(response);
    if(this.status().currentHTTPStatus === 500) {
            console.log('Error 500');
        }
    });





casper.run();
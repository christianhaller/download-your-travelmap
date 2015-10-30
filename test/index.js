var app = require('../backend'),
    expect  = require('expect.js');
describe('app', function () {
    it('Be OK https://en.wikipedia.org/wiki/Be_OK_%28Ingrid_Michaelson_song%29', function (done) {
        this.timeout(6000);
        app.handler({
            'url': decodeURIComponent('http://www.tripadvisor.com/members/christianhaller')
        }, {
            'succeed': function (data) {
                expect(data.data.username).to.equal('christianhaller');
                done();
            }, fail: function () {
            }
        });
    });
});
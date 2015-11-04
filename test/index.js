var app = require('../backend'),
    request = require('../backend/request'),
    expect = require('../backend/node_modules/expect.js/');
describe('app', function () {
    it('Be OK https://en.wikipedia.org/wiki/Be_OK_%28Ingrid_Michaelson_song%29', function (done) {
        this.timeout(4000);
        app.handler({
            'url': decodeURIComponent('http://www.tripadvisor.com/members/christianhaller')
        }, {
            'succeed': function (data) {
                expect(data.data.username).to.equal('christianhaller');
                done();
            }, fail: function (err) {
                done(err);
            }
        });
    });


    it('map request', function (done) {
        this.timeout(1000);
        request(' http://www.tripadvisor.com/TravelMap-a_uid.BAE86B9F2C0155C5003524F652DD4719').then(function (data) {
            expect(data.username).to.equal('surefire56');
            done();
        });
    });

    it('wrong url', function (done) {
        this.timeout(1000);
        request('http://www.tripadvisor.com').catch(function (err) {
            expect(err).to.be.an(Error);
            done();
        });
    });

    it('no url', function (done) {
        this.timeout(1000);
        request('').catch(function (err) {
            expect(err).to.be.an(Error);
            done();
        });
    });

    it('bad url', function (done) {
        this.timeout(1000);
        request('http://www.google.com').catch(function (err) {
            expect(err).to.be.an(Error);
            done();
        });
    });

    it('dns error', function (done) {
        this.timeout(1000);
        request('http://www.google.commmmm').catch(function (err) {
            expect(err).to.be.an(Error);
            done();
        });
    });

});
var validUrl = require('valid-url'),
    url = require('url');

module.exports = function (input) {
    var parts  = url.parse(input);

    if (parts.protocol.indexOf('http') !== 0) {
        throw 'invalid URL, should start with http'
    }

    if (!validUrl.isUri(input)) {
        throw 'invalid URL';
    }
    if (input.indexOf('tripadvisor') === -1) {
        throw 'please enter a tripadvisor URL like "http://www.tripadvisor.com/members/christianhaller"';
    }

};
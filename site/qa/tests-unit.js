var fortunes = require('../services/fortunes.js');
var assert = require('chai').assert;
suite('Fortune cookie tests', function () {
    test('getFortune() should return a fortune', function () {
        assert(typeof fortunes.getFortune() === 'string');
    });
});
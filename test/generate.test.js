var expect = require('expect.js'),
    generate = require('../');

describe('generation', function() {
    describe('latlon', function() {
        it('generates numbers', function(done) {
            var g = generate({
                mode: 'latlon'
            }, function() { return arguments; });

            g(function(_) {
                expect(_).to.have.length(3);
                expect(_[0]).to.be.a('number');
                expect(_[1]).to.be.a('number');
                expect(_[2]).to.be.a('number');
                done();
            });
        });
    });

    describe('place', function() {
        it('generates place names', function(done) {
            var g = generate({
                mode: 'place'
            }, function() { return arguments; });

            g(function(_) {
                expect(_).to.have.length(1);
                expect(_[0]).to.be.a('string');
                done();
            });
        });
    });

    describe('jsonp', function() {
        it('generates numbers', function(done) {
            var g = generate({
                mode: 'jsonp'
            }, function() { return arguments; });

            g(function(_) {
                expect(_).to.have.length(1);
                expect(_[0]).to.be.a('number');
                done();
            });
        });
    });

    describe('tiles', function() {
        it('generates tiles', function(done) {
            var g = generate({
                mode: 'tiles'
            }, function() { return arguments; });

            g(function(_) {
                expect(_).to.have.length(3);
                expect(_[0]).to.be.a('number');
                expect(_[1]).to.be.a('number');
                expect(_[2]).to.be.a('number');
                done();
            });
        });
    });
});

var expect = require('expect.js'),
    generate = require('../');

describe('generation', function() {
    describe('replay', function() {
        it('replay log', function(done) {
            var g = generate({
                mode: 'replay',
                log: __dirname + '/../fixtures/example.log'
            }, function() { return arguments; });

            g(function(_) {
                expect(_).to.have.length(1);
                expect(_[0]).to.be.a('string');
                done();
            });
        });
    });

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
            
            var tests = 20;
            for (var i = 0; i < 20; ++i) {
                g(function(_) {
                    expect(_).to.have.length(3);
                    expect(_[0]).to.be.a('number');
                    expect(_[0]).to.be.within(0, Infinity);
                    expect(_[1]).to.be.a('number');
                    expect(_[1]).to.be.within(0, Math.pow(2,_[0]));
                    expect(_[2]).to.be.a('number');
                    expect(_[2]).to.be.within(0, Math.pow(2,_[0]));
                });
            }
            done();
        });
    });

    describe('polyline', function() {
        it('generates encoded polyline', function(done) {
            var g = generate({
                bbox: '-120.0,37.0,-119.0,38.0',
                maxPoints: 100,
                mode: 'polyline'
            }, function() { return arguments; });

            g(function(_) {
                expect(_[0]).to.be.a('string');
                done();
            });
        });
    });
});

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

            g(function(_) {
                expect(_).to.have.length(3);
                expect(_[0]).to.be.a('number');
                expect(_[1]).to.be.a('number');
                expect(_[2]).to.be.a('number');
                done();
            });
        });
    });

    describe('batch', function() {
        it('generates batch', function(done) {
            var g = generate({
                mode: 'batch'
            }, function() { return arguments; });

            g(function(_) {
                expect(_).to.be.an('object');
                expect(_[0]).to.be.a('string');

                // Test that the extent of a single batch request
                // does not exceed a 10x10 lat/lon bbox.
                var parsed = _[0].split(';').map(function(point) {
                    return point.split(',').map(parseFloat);
                });
                var minX = parsed.reduce(function(memo, p) {
                    return Math.min(memo,p[0]);
                }, Infinity);
                var minY = parsed.reduce(function(memo, p) {
                    return Math.min(memo,p[1]);
                }, Infinity);
                var maxX = parsed.reduce(function(memo, p) {
                    return Math.max(memo,p[0]);
                }, -Infinity);
                var maxY = parsed.reduce(function(memo, p) {
                    return Math.max(memo,p[1]);
                }, -Infinity);
                expect(maxX - minX).to.be.lessThan(10);
                expect(maxY - minY).to.be.lessThan(10);

                done();
            });
        });
    });
});

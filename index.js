var sm = new (require('sphericalmercator'))(),
    fs = require('fs'),
    LogReader = require('log-reader');

module.exports = function(options, formatter) {
    if (options.mode === 'replay') {
        var reader = new LogReader(options.log).read();

        return function(cb) {
            reader.read(function(err, path) {
                if (err) throw err;
                return cb(formatter(path));
            });
        };
    }

    options.data = options.data || './data/cities.json';

    // Returns a random tile coordinate from the list of cities;
    var startZoom = options.minzoom,
        endZoom = options.maxzoom,
        zoomLevels = endZoom - startZoom;

    var cities = require(options.data);

    for (var i = 0; i < cities.length; i++) {
        var result = cities[i],
            bbox = cities[i].box;
        result.zooms = [];
        for (var j = 0; j <= zoomLevels; j++) {
            var box = sm.xyz(bbox, startZoom + j, false, 'WGS84');
            box.height = box.maxY - box.minY;
            result.zooms.push(box);
        }
    }

    if (options.mode === 'tiles') {
        return function(cb) {
            var city = cities[Math.random() * cities.length | 0];
            var zoomIndex = Math.random() * city.zooms.length | 0;
            var zoom = city.zooms[zoomIndex];
            var z = zoomIndex + startZoom;
            var x = zoom.minX + (zoom.width * 0.5 | 0) - (Math.random()*2|0) + (Math.random() * 2 | 0);
            var y = zoom.minY + (zoom.height * 0.5 | 0) - (Math.random()*2|0) + (Math.random() * 2 | 0);
            cb(formatter(z, x, y));
        };
    } else if (options.mode === 'batch') {
        return function(cb) {
            var length = Math.round(Math.random() * 50);
            var batch = [];
            for (var i = 0; i < length; i++) {
                var bbox = cities[Math.random() * cities.length | 0].bbox;
                var lon = bbox[0] + (bbox[2] - bbox[0]) * Math.random();
                var lat = bbox[1] + (bbox[3] - bbox[1]) * Math.random();
                batch.push([lon, lat].join(','));
            }
            cb(formatter(batch.join(';')));
        };
    } else if (options.mode === 'latlon') {
        return function(cb) {
            var bbox = cities[Math.random() * cities.length | 0].bbox;
            var zoom = startZoom + (Math.random() * zoomLevels) | 0;
            var lon = bbox[0] + (bbox[2] - bbox[0]) * Math.random();
            var lat = bbox[1] + (bbox[3] - bbox[1]) * Math.random();
            cb(formatter(lon, lat, zoom));
        };
    } else if (options.mode === 'place') {
        return function(cb) {
            var name = cities[Math.random() * cities.length | 0].name;
            cb(formatter(name));
        };
    } else if (options.mode === 'jsonp') {
        return function(cb) {
            var cbname = Math.floor(Math.random() * +new Date());
            cb(formatter(cbname));
        };
    } else {
        throw new Error('Mode ' + options.mode + ' is unknown');
    }
};

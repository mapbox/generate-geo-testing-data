[![Build Status](https://secure.travis-ci.org/mapbox/generate-geo-testing-data.png?branch=master)](http://travis-ci.org/mapbox/generate-geo-testing-data)

# generate-geo-testing-data

## example

```js
var generate_data = require('generate-geo-testing-data');

var generator = generate_data(
    { mode: 'tiles' },
    function(z, x, y) {
        return [z, x, y].join('/') + '.png';
    });

generator(function(uri) {
    // uri is '0/0/0.png'
});
```

## api

`generator(options, formatter)`

valid options:

* `mode` can be tiles, batch, latlon, place, jsonp, or replay
* `minzoom`
* `maxzoom`
* `bbox` (for `batch` and `polyline`)
* `maxBatch` (for `bench` and `polyline`) - max number of points to generate
* `z` (for `polyline`) - used to estimate tile size, which is used to generate point density

Mode Options:

* tiles gives a z, x, y
* latlon does width, height, lat, lon, zoom
* jsonp generates numbers
* place generates place names
* batch generates a given number of random points within a bounding box
* polyline generated a random encoded polyline within a bounding box

formatter takes a function that takes the data, like
xyz coordinates or placenames, and turns them into output



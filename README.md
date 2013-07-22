# generate-geo-testing-data

## example

```js
var generator = require('generate-geo-testing-data')({
    mode: 'tiles'
});

function request() {
    generator(function(uri) {
        // do request
    });
});
```

## api

`generator(options, formatter)`

valid options:

* `mode` can be tiles, batch, latlon, place, jsonp, or replay
* `minzoom`
* `maxzoom`

formatter takes a function that takes the data, like
xyz coordinates or placenames, and turns them into output

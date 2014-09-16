var polyline = require('polyline');

function createRandomLine(options) {
    var extent = {
        xMin: options.bbox[0],
        xMax: options.bbox[2],
        yMin: options.bbox[1],
        yMax: options.bbox[3],
    };

    var convert = Math.PI / 180;

    var points = [
        [
            Math.random() * (extent.xMax - extent.xMin) + extent.xMin,
            Math.random() * (extent.yMax - extent.yMin) + extent.yMin
        ]
    ];

    var randIterations = Math.ceil(Math.random() * options.maxPoints);
    var interval = ((extent.xMax - extent.xMin) + (extent.yMax - extent.yMin)) / randIterations;

    var randDirection = Math.floor(Math.random() * 360);
    for (var i=0; i<randIterations; i++) {
        if (points[points.length-1][0] + interval > extent.xMax ||
            points[points.length-1][0] - interval < extent.xMin ||
            points[points.length-1][1] + interval > extent.yMax ||
            points[points.length-1][1] - interval < extent.yMin) {
            randDirection += 1.0 * Math.floor(Math.random() * 180);
        }
        var randAzimuth = (180 * (Math.random() + Math.random() + Math.random()) / 3 - 90) + randDirection;
        points.push([
            Math.cos(randAzimuth * convert) * interval + points[points.length - 1][0],
            Math.sin(randAzimuth*  convert) * interval + points[points.length - 1 ][1]
        ]);
    }
    return polyline.encode(points);
}

module.exports = {
    createRandomLine: createRandomLine
};
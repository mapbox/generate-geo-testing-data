var polyline = require('polyline');
var sphericalmercator = require('sphericalmercator');
var sm = new sphericalmercator();

function createRandomLine(options) {
    var extent = {
        xMin: options.bbox[0],
        xMax: options.bbox[2],
        yMin: options.bbox[1],
        yMax: options.bbox[3],
    };

    var convert = Math.PI / 180;

    var z = 14;

    var points = [
        [
            Math.random() * (extent.yMax - extent.yMin) + extent.yMin,
            Math.random() * (extent.xMax - extent.xMin) + extent.xMin
        ]
    ];

    var firstTile = sm.xyz([points[0][1],points[0][0],points[0][1],points[0][0]], z);
    var tileBounds = sm.bbox(firstTile.minX,firstTile.minY, z);
    var tileBoundsSM = [
        sm.forward([tileBounds[0], tileBounds[1]]),
        sm.forward([tileBounds[2], tileBounds[3]])
    ];

    var interval = (tileBoundsSM[1][0] - tileBoundsSM[0][0]) / (Math.random()*100);
    var randIterations = Math.ceil(Math.random() * options.maxPoints);
    var edgePadding = ((extent.xMax - extent.xMin) + (extent.yMax - extent.yMin)) / 1000;

    var randDirection = Math.floor(Math.random() * 360);
    for (var i=0; i<randIterations; i++) {
        if (points[points.length-1][1] + edgePadding > extent.xMax ||
            points[points.length-1][1] - edgePadding < extent.xMin ||
            points[points.length-1][0] + edgePadding > extent.yMax ||
            points[points.length-1][0] - edgePadding < extent.yMin) {
            randDirection += 1.0 * Math.floor(Math.random() * 180);
        }
        var randAzimuth = (180 * (Math.random() + Math.random() + Math.random()) / 3 - 90) + randDirection;
        var XY = sm.forward([points[points.length - 1][1],points[points.length - 1][0]]);
        var newPoint = [
            Math.cos(randAzimuth * convert) * interval + XY[0],
            Math.sin(randAzimuth*  convert) * interval+ XY[1]
        ];
        var newXY = sm.inverse(newPoint);
        points.push([newXY[1],newXY[0]]);
    }

    return polyline.encode(points);
}

module.exports = {
    createRandomLine: createRandomLine
};
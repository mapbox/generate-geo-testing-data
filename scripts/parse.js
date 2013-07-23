var fs = require('fs');

function parseLine(line, i) {
    var cols =  line.split('\t');
    return {
        group: cols[0],
        geonameid: cols[1],
        box: [
            parseFloat(cols[3]),
            parseFloat(cols[4]),
            parseFloat(cols[5]),
            parseFloat(cols[2])
        ],
        slug: cols[6],
        name: cols[7]
    };
}

function lineNotEmpty(line, i) {
    return line.trim().length && i > 0;
}

var cities = fs.readFileSync('./data/cities.txt', 'utf8')
    .split('\n')
    .filter(lineNotEmpty)
    .map(parseLine);
fs.writeFileSync('./data/cities.json', JSON.stringify(cities, null, 2));

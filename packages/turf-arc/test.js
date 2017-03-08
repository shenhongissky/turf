const test = require('tape');
const fs = require('fs');
const path = require('path');
const load = require('load-json-file');
const write = require('write-json-file');
const {featureCollection} = require('@turf/helpers');
const truncate = require('@turf/truncate');
const arc = require('./');

const directories = {
    in: path.join(__dirname, 'test', 'in') + path.sep,
    out: path.join(__dirname, 'test', 'out') + path.sep
};

let fixtures = fs.readdirSync(directories.in).map(filename => {
    return {
        filename,
        name: path.parse(filename).name,
        geojson: load.sync(path.join(directories.in, filename))
    };
});

test('turf-arc', t => {
    for (const {name, filename, geojson} of fixtures) {
        const start = geojson.features[0];
        const end = geojson.features[1];
        const line = truncate(arc(start, end));
        const results = featureCollection([line, start, end]);

        if (process.env.REGEN) write.sync(directories.out + filename, results);
        t.deepEquals(results, load.sync(directories.out + filename), name);
    }
    t.end();
});

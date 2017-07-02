//var namedRegexp = require("named-js-regexp");

var LineByLineReader = require('line-by-line'),

lr = new LineByLineReader('data/maclist.txt', {
        encoding: 'utf8',
        skipEmptyLines: true
});

var db = [];

lr.on('error', function (err) {
    console.log('Load OUI DB Failed! Error: ' + err);
});

lr.on('line', function (line) {

    if (!line.startsWith("#")) {

        //var regex = /(\d{2}\:\d{2}\:\d{2})\t+(.*[^'#'][^\t])\#(.*)/

        //var regex = /(\d{2}\:\d{2}\:\d{2})\t+(.*[^#])(.*)/

        //var re = namedRegexp("(?<mac>\d{2}\:\d{2}\:\d{2})\t+(.*[^#])(.*)");

        //var re = namedRegexp("(?<mac>\d{2}\:\d{2}\:\d{2})");

        //var result = line.match(regex);

        //var result = re.exec(line);

        var result = line.split('\t');

        //var record = [, mac, manufacturer, comment] = line.match(regex) || [];

        var record = { oui: result[0], manufacturer: result[1], comment: result[2] };

        db.push(record);
    }

});

lr.on('end', function () {
    console.log('Load OUI DB Completed');
});

module.exports = {

    findOUI: function (mac, callback) {

        mac = mac.toLowerCase();

        for (index in db) {

            var record = db[index];

            if (mac.toLowerCase().startsWith(record.oui)) {
                callback(true, record);
                return;
            }

        }   

        callback(false, null);
    }
};

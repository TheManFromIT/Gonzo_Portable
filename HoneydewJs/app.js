'use strict';
var wifi = require('./modules/wifi')
var seneca = require('seneca')()

seneca.add('role: analysis, cmd: scan', function (msg, respond) {

    var data = wifi.getNetworks(function (data) {

        respond(null, { results: JSON.stringify(data) })

    });

});

console.log('HoneydewJs Running');
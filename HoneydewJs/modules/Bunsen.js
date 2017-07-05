var wifi = require('../modules/wifi');
var seneca = require('seneca')()

module.exports = function bunsen(options) {

    this.add('role: analysis, cmd: scan', function (msg, respond) {

        var data = wifi.getNetworks(function (data) {

            respond(null, data )

        });

    });


}
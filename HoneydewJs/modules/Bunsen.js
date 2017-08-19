'use strict';
var microscope = require('../modules/microscope');
var seneca = require('seneca')();

microscope.startScanning();

module.exports = function bunsen(options) {

    this.add('role: configuration, cmd: set, type: location', function (msg, respond) {

        microscope.setLocation(msg.latt, msg.long);

    });

    this.add('role: configuration, cmd: get, type: location', function (msg, respond) {

        respond(null, microscope.getLocation());

    });

    this.add('role: analysis, cmd: ping', function (msg, respond) {

        var target = msg.target || "www.google.com";
        var count = msg.count || 5;

        var data = microscope.pingAddress(target, { options: count }, function (data) {

            respond(null, data);

        });

    });

    this.add('role: analysis, cmd: scan', function (msg, respond) {

        var data = microscope.getNetworks(function (data) {

            respond(null, data);

        });

    });

    this.add('role: analysis, cmd: examine', function (msg, respond) {

        microscope.getNetworks(function (data) {

            // Find Our Network

            var home = null;

            for (network of list) {

                if (network.bssid === msg.bssid) {
                    home = network;
                    break;
                }

            }

            if (home === null) {
                respond(null, { found: false });
            }


            respond(null, { found: true });

        });

    });


};
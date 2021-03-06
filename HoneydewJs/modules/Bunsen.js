﻿'use strict';
var microscope = require('../modules/microscope');
var seneca = require('seneca')();

microscope.startScanning();

module.exports = function bunsen(options) {

    this.add('role:configuration,cmd:set,type:location', function (msg, respond) {

        microscope.setLocation(msg.latt, msg.long);

    });

    this.add('role:configuration,cmd:get,type:location', function (msg, respond) {

        respond(null, microscope.getLocation());

    });

    this.add('role:analysis,cmd:ping', function (msg, respond) {

        var target = msg.target || "www.google.com";
        var count = msg.count || 5;

        microscope.pingAddress(target, { options: count }, function (data) {

            respond(null, data);

        });

    });

    this.add('role:analysis,cmd:describe', function (msg, respond) {

        microscope.getNetworks(function (data) {

            var entry = data.find(e => e.network.mac === msg.bssid);
            
            respond(null, entry);

        });

    });

    this.add('role:analysis,cmd:scan', function (msg, respond) {

        microscope.getNetworks(function (data) {

            respond(null, data);

        });

    });

    this.add('role:analysis,cmd:examine', function (msg, respond) {

        microscope.getNetworks(function (data) {            

            // Find Our Network
            var home = data.find(e => e.network.mac === msg.bssid);

            if (home === null) {
                respond(null, { status: 'NOT FOUND' });
            }
                        
            var status = 'UNKNOWN';

            // Look for networks on the same channel            
            var conflicts = data.filter(e => e.network.channel === home.network.channel && e.network.mac !== home.network.ssid);

            if (conflicts === null) {

                status = 'CLEAR';

            } else {

                status = 'CONFLICT';

            }

            respond(null, { status: status });

        });

    });


};
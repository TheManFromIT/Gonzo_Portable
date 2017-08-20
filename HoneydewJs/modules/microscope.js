'use strict';
var os = require('os');
var wifiscanner = require('node-wifi-scanner');
var oui = require('oui');
var ping = require("ping-wrapper3");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/honeydew');

var scanCollection = db.get('scancollection');
var pingCollection = db.get('pingcollection');

var list = [];

var scanTimer = null;
var pingTimer = null;

var pingRunning = false;

var long = 0;
var latt = 0;

module.exports = {

    pingAddress: function (target, options, callback) {

        var exec = ping(target, options); // default 10 packets

        var results = [];

        exec.on("data", function (data) {
            // { no: 1, bytes: 64, time: 54, ttl: 1 }
            results.push(data);
        });

        exec.on("exit", function (data) {
            // { sent: 10, recieved: 10, loss: 0, time: 9010 }
            results.push(data);

            callback(results);
        });

    },

    getNetworks: function (callback) {

        callback(list);

    },

    startScanning: function () {
        
        scanTimer = setInterval(scan, 3000);

    },

    stopScanning: function () {

        if (scanTimer !== null) {

            clearInterval(scanTimer);

        }

    },

    setLocation: function (latt, long) {
        this.latt = latt;
        this.long = long;

    },

    getLocation: function () {
        return { latt: this.latt, long: this.long };
    }
};


function scan() {

    wifiscanner.scan(function (err, data) {

        if (err) {
            console.log("Error : " + err);
            return;
        }

        var extendedData = [];

        for (var number in data) {

            var network = data[number];

            if (network.mac) {

                var result = oui(network.mac);

                if (result !== null) {
                    result = result.replace(/\n/g, " ");
                } else {
                    result = "UNRECOGNISED";
                }

                if (network.ssid === null || network.ssid === "") {
                    network.ssid = "<HIDDEN>";
                }

                extendedData.push({ network: network, manufacturer: result });

            }
        }

        // Sort by Signal Strength and Channel
        extendedData.sort(function (a, b) { return a.network.channel - b.network.channel || a.network.rssi - b.network.rssi; });

        // Store Data

        var timeStamp = Date.now();
        var hostName = os.hostname();
        var osPlatform = os.type() + ' ' + os.platform() + ' ' + os.arch() + ' ' + os.release();

        var record = { timestamp: timeStamp, longitude: long, latitude: latt, hostname: hostName, platform: osPlatform, list: extendedData };

        scanCollection.insert(record);

        list = extendedData;

    });
}


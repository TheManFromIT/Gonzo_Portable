'use strict';
var wifiscanner = require('node-wifi-scanner');
var oui = require('oui');

var list = [];


var timer = null;

module.exports = {

    getNetworks: function (callback) {

        callback(list);

    },

    startScanning: function () {

        timer = setInterval(scan, 3000);

    },

    stopScanning: function () {

        if (timer !== null) {
            clearInterval(timer);
        }

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

        // Sort by Signal Strength and Channel
        extendedData.sort(function (a, b) { return a.network.channel - b.network.channel || a.network.rssi - b.network.rssi; });

        list = extendedData;

    });
}


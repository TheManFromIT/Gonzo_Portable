var wifiscanner = require('node-wifiscanner2');
var oui = require('oui');

module.exports = {

    getNetworks: function (callback) {        

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

                extendedData.push( { network: network, manufacturer: result });

            }

            // Sort by Signal Strength and Channel
            extendedData.sort(function (a, b) { return (a.network.channel - b.network.channel) || (a.network.signal_level - b.network.signal_level)});

            callback(extendedData);
            
        });

    }
};

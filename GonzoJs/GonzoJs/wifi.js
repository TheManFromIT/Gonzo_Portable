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

                extendedData.push( { network: network, manufacturer: result });

            }

            callback(extendedData);
            
        });

    }
};

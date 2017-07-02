var wifiscanner = require('node-wifiscanner2');
var ouidb = require('./ouidb')

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

                ouidb.findOUI(network.mac, function (result,record) {

                    if (result) {

                        var extended = { mac: network.mac, manufacturer: record.manufacturer };

                    }

                });

            }

            callback(extendedData);
            
        });

    }
};

var wifiscanner = require('node-wifiscanner2');

module.exports = {
    getNetworks: function (callback) {        

        wifiscanner.scan(function (err, data) {

            if (err) {
                console.log("Error : " + err);
                return;
            }

            callback(data);
            
        });

    }
};

'use strict';
var express = require('express');
var router = express.Router();

var seneca = require('seneca')().client(8487, 'localhost');

var publicIp = require('public-ip');

/* GET monitor page. */
router.get('/', function (req, res) {

    seneca.act({ role: 'analysis', cmd: 'scan' }, function (error, result) {
        res.render('monitor', { title: 'Intrusion Detection Monitor Selection', data: result });
    });

});

/* POST monitoring page. */
router.post('/monitoring', function (req, res) {

    var bssid = req.param('bssid');
    var name = req.param('network');

    publicIp.v4().then(ip => {

        res.render('monitoring', { title: 'Monitor Network', network: name, bssid: bssid, publicIp: ip });

    });

});

module.exports = router;

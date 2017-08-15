'use strict';
var express = require('express');
var router = express.Router();

var seneca = require('seneca')().client(8487, 'localhost');

var publicIp = require('public-ip');


/* GET home page. */
router.get('/', function (req, res) {

    publicIp.v4().then(ip => {

        seneca.act({ role: 'configuration', cmd: 'get', type: 'location' }, function (error, location) {

            res.render('location', { title: 'Location Configuration', publicIp: ip, location: location });

        });

    });

});

/* POST setup page. */
router.post('/setup', function (req, res) {

    var latitude = req.param('latitude');
    var longitude = req.param('longitude');

    seneca.act({ role: 'configuration', cmd: 'set', type: 'location', latt: latitude, long: longitude }, function (error, location) {

        res.redirect('/functions')

    });

});


module.exports = router;

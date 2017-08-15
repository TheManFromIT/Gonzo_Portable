'use strict';
var express = require('express');
var router = express.Router();

var seneca = require('seneca')().client(8487, 'localhost');


/* GET home page. */
router.get('/', function (req, res) {

    seneca.act({ role: 'configuration', cmd: 'get', type: 'location' }, function (error, location) {

        if (location === null) {
            location = { latt: 0, long: 0 };
        }

        res.render('index', { title: 'Gonzo Wifi Intrusion Detection', location: location });

    });

});

module.exports = router;

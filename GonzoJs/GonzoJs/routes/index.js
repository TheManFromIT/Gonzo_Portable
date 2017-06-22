'use strict';
var express = require('express');
var router = express.Router();
var wifi = require('../wifi.js')

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Gonzo Wifi Intrusion Detection' });
});

/* GET list page. */
router.get('/list', function (req, res) {
    wifi.getNetworks(function (data) {
        res.render('networks', { title: 'Wireless Network List', networks: data });
    });
});

module.exports = router;

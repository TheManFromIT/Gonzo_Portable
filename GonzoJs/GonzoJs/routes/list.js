'use strict';
var express = require('express');
var router = express.Router();
var seneca = require('seneca')().client(8487, 'localhost');

/* GET list page. */
router.get('/', function (req, res) {

    seneca.act({ role: 'analysis', cmd: 'scan' }, function (error, result) {
        res.render('networks', { title: 'Wireless Network List', data: result });
    });

    //wifi.getNetworks(function (data) {
    //    res.render('networks', { title: 'Wireless Network List', data: data });
    //});
});

module.exports = router;

'use strict';
var express = require('express');
var router = express.Router();

var seneca = require('seneca')().client(8487, 'localhost');

/* GET monitor page. */
router.get('/', function (req, res) {

    seneca.act({ role: 'analysis', cmd: 'scan' }, function (error, result) {
        res.render('monitor', { title: 'Gonzo Wifi Intrusion Detection Monitor', data: result });
    });

});

/* GET list page. */
router.get('/monitoring', function (req, res) {

    seneca.act({ role: 'analysis', cmd: 'scan' }, function (error, result) {
        res.render('networks', { title: 'Wireless Network List', data: result });
    });

});

module.exports = router;

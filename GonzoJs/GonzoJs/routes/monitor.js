'use strict';
var express = require('express');
var router = express.Router();

var seneca = require('seneca')().client(8487, 'localhost');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Gonzo Wifi Intrusion Detection' });
});

/* GET list page. */
router.get('/list', function (req, res) {

    seneca.act({ role: 'analysis', cmd: 'scan' }, function (error, result) {
        res.render('networks', { title: 'Wireless Network List', data: result });
    });

});

module.exports = router;

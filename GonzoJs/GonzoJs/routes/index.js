'use strict';
var express = require('express');
var router = express.Router();

var seneca = require('seneca')().client(8487, 'localhost');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Gonzo Wifi Intrusion Detection' });
});

module.exports = router;

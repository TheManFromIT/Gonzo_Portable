'use strict';
var express = require('express');
var router = express.Router();
var seneca = require('seneca')().client(8487, 'localhost');

/* GET scanner listing. */
router.get('/list', function (req, res) {

    seneca.act({ role: 'analysis', cmd: 'scan' }, function (error, result) {
        res.send(JSON.stringify(result));
    });
 
});

module.exports = router;

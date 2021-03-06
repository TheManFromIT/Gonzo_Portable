﻿'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wsrpc = require('express-ws-rpc');

const uuidv4 = require('uuid/v4');

var routes = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list');
var api = require('./routes/api');
var location = require('./routes/location');
var monitor = require('./routes/monitor');
var status = require('./routes/status');
var functions = require('./routes/functions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/monitor', monitor);
app.use('/list', list);
app.use('/api', api);
app.use('/location', location);
app.use('/functions', functions);
//app.use('/status', status);

// Setup WebSockets

// Setup WebSockets
var wss = require('express-ws')(app).wss;

// on websocket request to the root
app.ws('/gonzo', function (ws, req) {
    // this function gets called on each connection

    // extend ws to decode messages
    wsrpc(ws);

    var seneca = require('seneca')().client(8487, 'localhost');

    var monitor_bssid = null;

    ws.on('monitor', function (bssid, result) {

        monitor_bssid = bssid;

        seneca.act({ role: 'analysis', cmd: 'describe', bssid: monitor_bssid }, function (error, description) {

            result(null, description);

        });

        seneca.act({ role: 'analysis', cmd: 'examine', bssid: monitor_bssid }, function (error, result) {

            ws.call('report', result, function (err, reportResult) {

                reportResult(null);

            });

        });

    });

    
    //ws.on('status', function (result) {
    //    result(null, curr++);
    //});



});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Page Not Found!');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('GonzoJs on port ' + server.address().port);
});

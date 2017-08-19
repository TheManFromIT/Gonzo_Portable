var bssid = $('td#bssid').val();

function getWsAbsoluteUrl(relative) {
    var loc = window.location;
    var proto = loc.protocol === "https:" ? "wss://" : "ws://";
    var port = loc.port || (loc.protocol === "https:" ? 443 : 80);
    return proto + loc.hostname + ":" + port + relative;
}

// create WebSocket client
// I'm not using `ws` here, because it doesn't support
// EventEmitter interface (i.e. the one that lets you call `on`)
var WebSocket = require('simple-websocket');
var ws = new WebSocket(getWsAbsoluteUrl('/'));

// extend ws to decode messages
require('express-ws-rpc')(ws);

ws.on('status', function (result) {

    // Gives Server a Callback for Status of Network Being Monitored
    result(null);

});

ws.on('description', function (description) {

    // Gives Server a Callback for Description of Network Being Monitored
    result(null);

});

// when we get connected
ws.on('connect', function () {

    ws.call('monitor', bssid, function (err, session) {
        console.log('Monitoring Session ' + session);
    });

});
'use strict';
$(function () {

    var bssid = $('td#bssid').text();

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
    var ws = new WebSocket(getWsAbsoluteUrl('/gonzo'));

    // extend ws to decode messages
    require('express-ws-rpc')(ws);

    //ws.on('status', function (result) {

    //    // Gives Server a Callback for Status of Network Being Monitored
    //    result(null);

    //});

    // Gives Server a Callback for Description of Network Being Monitored

    ws.on('report', function (report, result) {

        // Display Status (Callback from Examine)
        $('td#status').text(report.status);
        
        result({ acknowledged: true });

    });

    // when we get connected
    ws.on('connect', function () {

        ws.call('monitor', bssid, function (err, description) {

            $('td#essid').text(description.network.ssid);
            $('td#channel').text(description.network.channel);
            $('td#rssi').text(description.network.rssi);
            $('td#status').text("UNKNOWN");

            console.log('Monitoring ' + description.network.ssid);
        });
    });
});
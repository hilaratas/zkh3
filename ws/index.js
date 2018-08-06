var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/ws'));

var server = http.createServer(app);
server.listen(8080);

console.log("Создан WebSocketServer");

var webSocketServer = new WebSocketServer({server: server});
webSocketServer.on('connection', function(ws) {

  var timer = setInterval(function() {
    ws.send(JSON.stringify(process.memoryUsage()), function(error) {
      /* handle errors */
    });
  }, 500);

  console.log('WebSocketServer: клиент подключился');

  ws.on('close', function() {
    console.log('клиент отключился');
    clearInterval(timer);
  });
});
var express = require('express')
  , app = express.createServer();

app.listen("8000");

var WebSocketServer = require('ws').Server
  , ws = new WebSocketServer({ server: app });

// some array for connected sockets

CLIENTS_COUNT = 0;
CLIENTS = { };
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index2.html');
});
ws.on("connection", function(socket) {

  console.log("user connected");

  // store new connection so we can use it later

  CLIENTS[++CLIENTS_COUNT] = socket;
  socket.id = CLIENTS_COUNT;

  ws.on("close", function() {
    console.log("user disconnects");
    delete CLIENTS[this.id];
  });

  ws.on("message", function(message) {
    ws.send(message);
  });
});


var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(8000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/video.ogg', function (req, res) {
  res.sendfile(__dirname + '/pass-countdown.ogg');
});
app.get('/controller/:code', function (req, res) {
  if(req.params.code!='1525'){
     res.send('bad code');
     return;
  }
  res.sendfile(__dirname + '/control.html');
});
var client = io
  .of('/client')
  .on('connection', function (socket) {
  });
var controller = io
  .of('/controller')
  .on('connection', function (socket) {
    socket.on('feedcontrol', function (action) {
    console.log("feed control :"+action);
    if(action=='start'){
      client.emit('startfeed');
    }else if(action=='stop'){
      client.emit('stopfeed');
    }
  });
  controller.on('hi', function () {
    console.log("client said hi");
  });
});

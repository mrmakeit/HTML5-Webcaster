
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

var streamJSON;

var audioCount;
var videoCount;
var audioName=new Array();
var videoName=new Array();
var audioAddr=new Array();
var videoAddr=new Array();
/* Test Data Below
audioCount=2;
videoCount=1; 	
audioName[0]='test';
audioAddr[0]='localhost';
audioName[1]='test2';
audioAddr[1]='localhost:3001';
videoName[0]='test3';
videoAddr[0]='localhost:3002';
*/

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);

// Socket.io
// ---------
// client:functions     
var client = io
  .of('/client')
  .on('connection', function (socket) {
    if(audioCount>0){
      for(var i = 0;i<audioCount;i++){
        var tmpJSON={id:audioName[i],source:audioAddr[i]}
        socket.emit('add audio',tmpJSON);
      }
    }
    if(videoCount>0){
      for(var i = 0;i<videoCount;i++){
        var tmpJSON={id:videoName[i],source:videoAddr[i]}
        socket.emit('add video',tmpJSON);
      }
    }
  });


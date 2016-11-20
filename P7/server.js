var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('Pract7'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


var marcador() {
   num_i:0,
   num_d:0
}    

io.on('connection', function(socket){
  socket.on('marcador-actual', function(){
    //io.emit('redibuja-marcador','marcador');
    io.emit('redibuja-marcador', {
          num_i:num_i,
          num_d:num_d
  });
});


  //console.log('a user connected');
  socket.on('marcador-actual', function(){
    marcador = msg;
    console.log('',msg);
    io.emit('redibuja-marcador', "Goles local: "+msg.num_i);
    io.emit('redibuja-marcador', "Goles visitante: "+msg.num_d);
 
  });

  socket.on('disconnect',function() {
         console.log('user disconnected');
  });



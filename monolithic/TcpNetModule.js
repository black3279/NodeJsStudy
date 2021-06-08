var net = require('net');
var server = net.createServer((socket) => {
  socket.end("hello wolrd");
});

server.on('error', (err) =>{
  console.log(err);
});

server.listen(9000, ()=>{
  console.log('listen', server.address());
});

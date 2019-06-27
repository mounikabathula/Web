const Net =require("net");
const JsonSocket = require('json-socket')

const port =8080;

//Creating a new TCP Server
const server = new Net.Server();


server.listen(port,()=>{console.log("Server running at port ",port);
})



// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection',(socket)=>{
    console.log("A new connection has been established.");
    




    socket = new JsonSocket(socket); //Now we've decorated the net.Socket to be a JsonSocket
    socket.on('message', function(message) {
        var result = message;
        console.log(result);
        
      
        
        socket.sendEndMessage({result: message.action});
    });



 // When the client requests to end the TCP connection with the server, the server
 // ends the connection.
 socket.on('end', function() {
   // console.log('Closing connection with the client');
});
  // Don't forget to catch error, for your own sake.
  socket.on('error', function(err) {
    console.log(`Error: ${err}`);
});
});
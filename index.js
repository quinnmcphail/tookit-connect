// Load the TCP Library
var net = require('net');

// Keep track of the chat clients
var clients = [];
var tcpport = 3097;
var tcphost;

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort;

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  console.log("Welcome " + socket.name);
  console.log(socket.name + " joined");

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
  	console.log('Incoming Data: ' + data.toString());
  	var str = data.toString().split("@");
  	if (str[1] == 'Pong'){
  		broadcast('AnnouncerKit@AckPong@$');
        	broadcast('AnnouncerKit@Ping@$');
  	}
	if (str[1]== 'AckPing'){
		broadcast('AnnouncerKit@GetInfo@$');
	}
	if (str[1]== 'Store'){
		broadcast('AnnouncerKit@AckStore@'+str[str.length-2]+'@$');
		console.log(bibs);
	}
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log(socket.name + " left");
  });

  // Send a message to all clients
  function broadcast(message) {
    clients.forEach(function (client) {
      client.write(message);
    });
    // Log it to the server output too
    console.log('Outgoing Data: ' + message);
  }

}).listen(tcpport);

console.log("TCP server running at port " + tcpport);

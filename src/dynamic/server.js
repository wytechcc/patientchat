/*
  server.js
  Isolated Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  This module is executed exactly once
*/


/* 
  Base code for server taken from: https://github.com/shanet/WebRTC-Example/blob/master/server/server.js
*/

//  Default Port
const HTTPS_PORT = 3000;

const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;


const serverConfig = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

// ----------------------------------------------------------------------------------------

// Create a server for the client html page
const handleRequest = function(request, response) {
  // Render the single client html file for any request the HTTP server receives
  console.log('request received: ' + request.url);

  //  Login Page
  if(request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(fs.readFileSync('src/login.html'))
  } else if(request.url === '/dynamic/login.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
    response.end(fs.readFileSync('src/dynamic/login.js'))
    //  Main CSS
  } else if(request.url == '/style/main.css') {
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.end(fs.readFileSync('src/style/main.css'))
    //  Client Page
  } else if (request.url == '/client.html') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(fs.readFileSync('src/client.html'))
  } else if (request.url == '/dynamic/client.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
    response.end(fs.readFileSync('src/dynamic/client.js'))
  }
};

/* hostAppServer()
      Opens Port for Video Channels
*/
  const httpsServer = https.createServer(serverConfig, handleRequest);
  httpsServer.listen(HTTPS_PORT, '0.0.0.0');

// ----------------------------------------------------------------------------------------

// Create a server for handling websocket calls
const wss = new WebSocketServer({server: httpsServer});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    // Broadcast any received message to all clients
    console.log('received: %s', message);
    wss.broadcast(message);
  });
});

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

console.log('Server running. Visit https://localhost:' + HTTPS_PORT + ' in Firefox/Chrome.\n\n\
Some important notes:\n\
  * Note the HTTPS; there is no HTTP -> HTTPS redirect.\n\
  * You\'ll also need to accept the invalid TLS certificate.\n\
  * Some browsers or OSs may not allow the webcam to be used by multiple pages at once. You may need to use two different browsers or machines.\n'
);


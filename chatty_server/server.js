const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
    // console.log(client.size)
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };



// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    // Broadtcasts total number of active users 
    console.log(wss.clients.size);
    const activeUsers = {
        type: "updateClient",
        activeUser: wss.clients.size}
    wss.broadcast(JSON.stringify(activeUsers));

  ws.on('message', function incoming(data) {
    const dataObj = JSON.parse(data);
    dataObj.id = uuidv4();
    console.log(dataObj);
    if (dataObj.type === 'postMessage') {
        dataObj.type = 'incomingMessage'
        const newMsg = JSON.stringify(dataObj)
        wss.broadcast(newMsg);
    } else if (dataObj.type === 'postNotification') {
        dataObj.type = 'incomingNotification'
        const newMsg = JSON.stringify(dataObj)
        wss.broadcast(newMsg);
    } else {
        return;
    }
    

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log("Number of connections:", wss.clients.size);
    const activeUsers = {
        type: "updateClient",
        activeUser: wss.clients.size}
    wss.broadcast(JSON.stringify(activeUsers));
    // wss.broadcast(wss.clients.size);
  })
});
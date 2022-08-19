const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const path = require("path");

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/index.html"));
});

// Attach to the websocket to handle broadcast and emits.
io.on('connection', (socket) => {
    console.log('User connected');
    socket.broadcast.emit('new-user', 'Server sees new user.');

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    })

    socket.on('message', (data) => {
        if (data) {
            console.log('Message received: ' + data);
        }
    })
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve static files

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('joinChat', (username) => {
        socket.username = username;
        io.emit('message', `${username} joined the chat!`);
    });

    // Handle chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', `${socket.username}: ${msg}`);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        io.emit('message', `${socket.username} left the chat.`);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

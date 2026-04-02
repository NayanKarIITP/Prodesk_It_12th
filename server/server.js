const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Ensure this matches your React port
    methods: ["GET", "POST"]
  }
});

// Level 2: Store users to keep track of who is in which room
let users = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // LEVEL 3: Join Room Logic
  socket.on("join_room", (data) => {
    const { username, room } = data;
    
    socket.join(room);
    users[socket.id] = { username, room };

    console.log(`User ${username} joined room: ${room}`);

    // Notify others in the room that a user joined
    socket.to(room).emit("receive_message", {
      message: `${username} joined the room`,
      username: "System",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  // LEVEL 1 & 3: Targeted Messaging (Fixes Duplicates)
  socket.on("send_message", (data) => {
    const user = users[socket.id];
    if (user) {
      // .to(user.room) sends to everyone in the room EXCEPT the sender
      // This prevents the "double message" bug on the sender's screen
      socket.to(user.room).emit("receive_message", data);
    }
  });

  // LEVEL 2: Typing Indicators
  socket.on("typing", () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit("show_typing", user.username);
    }
  });

  socket.on("stop_typing", () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit("hide_typing");
    }
  });

  // Cleanup on Disconnect
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      socket.to(user.room).emit("receive_message", {
        message: `${user.username} has left the chat`,
        username: "System",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      delete users[socket.id];
    }
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
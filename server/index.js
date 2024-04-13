import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on("message", (data) => {
    console.log(data);
    // socket.broadcast.emit("receive-message", data);
    io.to(data.room).emit("receive-message", data.message);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  // socket.broadcast.emit("welcome", `Welcome to the server ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User disconnected " + socket.id);
  });
});

server.listen(3000, () => {
  console.log("Listening...");
});

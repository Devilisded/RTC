import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketid, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  // const socket = io("http://localhost:3000");
  const socket = useMemo(() => io("http://192.168.12.177:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });
    socket.on("welcome", (message) => {
      console.log(message);
    });
    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <Typography variant="h2" component="div" gutterBottom>
        {socketid}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />{" "}
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <form onSubmit={joinRoom}>
        <h2>Join Room</h2>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join Room
        </Button>
      </form>
      {messages.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Container>
  );
};

export default App;

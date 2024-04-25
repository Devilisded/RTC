import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketid, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
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
    socket.emit("message", { message, room, name });
    setMessage("");
  };
  const joinRoom = (e) => {
    e.preventDefault();
    setRoom(roomName);
    socket.emit("join-room", roomName);
    setRoomName("");
  };
  return (
    <>
      {/* {messages.map((item, index) => (
        <div key={index}>
          {item.name}: {item.message}
        </div>
      ))} */}

      {room.length > 1 ? (
        <>
          <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {messages.map((item, index) => (
              <div className="chat-message" key={index}>
                <div
                  className={
                    name !== item.name
                      ? "flex items-end"
                      : "flex items-end justify-end"
                  }
                >
                  <div
                    className={
                      name !== item.name
                        ? "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
                        : "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
                    }
                  >
                    <div>
                      <span
                        className={
                          name !== item.name
                            ? "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                            : "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white "
                        }
                      >
                        {item.name}: <br />
                        {item.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      Your error message says permission denied, npm global
                      installs must be given root privileges.
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                />
              </div>
            </div> */}
          </div>
          {/* <form onSubmit={handleSubmit}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="outlined-basic"
              label="Message"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form> */}
          <div className="relative bottom-5">
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 sticky bottom-5 w-full bg-white">
              <div className="relative flex">
                <form className="w-full" onSubmit={handleSubmit}>
                  <span className="absolute inset-y-0 flex items-center"></span>
                  <input
                    type="text"
                    placeholder="Write your message!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  />
                  <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    >
                      <span className="font-bold">Send</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 ml-2 transform rotate-90"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        // <form onSubmit={joinRoom}>
        //   <h2>Join Room</h2>
        //   <TextField
        //     value={roomName}
        //     onChange={(e) => setRoomName(e.target.value)}
        //     id="outlined-basic"
        //     label="Message"
        //     variant="outlined"
        //   />
        //   <h2>Enter Your Name</h2>

        //   <TextField
        //     value={name}
        //     onChange={(e) => setName(e.target.value)}
        //     id="outlined-basic"
        //     label="Name"
        //     variant="outlined"
        //   />
        //   <Button type="submit" variant="contained" color="primary">
        //     Join Room
        //   </Button>
        // </form>
        <div className="bg-white dark:bg-gray-900">
          <div className="flex justify-center h-screen">
            <div
              className="hidden bg-cover lg:block lg:w-2/3"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
              }}
            >
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                  <h2 className="text-4xl font-bold text-white">Brand</h2>

                  <p className="max-w-xl mt-3 text-gray-300">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                    autem ipsa, nulla laboriosam dolores, repellendus
                    perferendis libero suscipit nam temporibus molestiae
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
              <div className="flex-1">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                    Brand
                  </h2>

                  <p className="mt-3 text-gray-500 dark:text-gray-300">
                    Sign in to access your account
                  </p>
                </div>

                <div className="mt-8">
                  <form onSubmit={joinRoom}>
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        Enter Room Name
                      </label>
                      <input
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        type="text"
                        name="room"
                        id="email"
                        placeholder="Room Name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label
                          for="password"
                          className="text-sm text-gray-600 dark:text-gray-200"
                        >
                          Your Name
                        </label>
                      </div>

                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        id="password"
                        placeholder="Your Name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Join Room
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;

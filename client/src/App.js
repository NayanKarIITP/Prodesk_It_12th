import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css"; // <--- CRITICAL: Make sure this import is here
import Chat from "./Chat";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const joinChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", { username, room });
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="join-container">
          <h2>Live Chat</h2>
          <input 
            type="text"
            placeholder="Your Name..." 
            onChange={(e) => setUsername(e.target.value)} // Fixes 'setUsername' warning
          />
          <select onChange={(e) => setRoom(e.target.value)}> // Fixes 'setRoom' warning
            <option value="">-- Select Room --</option>
            <option value="General">General</option>
            <option value="Tech Support">Tech Support</option>
          </select>
          <button onClick={joinChat}>Enter Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
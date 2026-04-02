import React, { useEffect, useState, useRef } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [typer, setTyper] = useState(""); 
  
  // Reference for auto-scrolling
  const scrollRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      await socket.emit("send_message", messageData);
      
      // Add locally immediately
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      socket.emit("stop_typing");
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever messageList changes
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

useEffect(() => {
    // 1. Define the function separately so we can remove it later
    const handleMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    // 2. Start listening
    socket.on("receive_message", handleMessage);
    
    socket.on("show_typing", (user) => setTyper(`${user} is typing...`));
    socket.on("hide_typing", () => setTyper(""));

    // 3. THE CLEANUP (This stops the duplicates)
    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("show_typing");
      socket.off("hide_typing");
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat: <strong>{room}</strong></p>
      </div>
      
      <div className="chat-body">
        {messageList.map((content, index) => {
          const isSystem = content.username === "System";
          const isMe = content.username === username;

          return (
            <div 
              className={`message ${isSystem ? "system-msg" : ""}`} 
              key={index} 
              id={isMe ? "you" : "other"}
            >
              <div className="message-content">
                <p>{content.message}</p>
              </div>
              {!isSystem && (
                <div className="message-meta">
                  <span>{content.time}</span>
                  <span>[{content.username}]</span>
                </div>
              )}
            </div>
          );
        })}
        {/* Invisible element to scroll to */}
        <div ref={scrollRef} />
      </div>

      <div className="chat-footer">
        <div className="typing-box">
          {typer && <small>{typer}</small>}
        </div>
        
        <div className="input-area">
          <input
            type="text"
            value={currentMessage}
            placeholder="Type a message..."
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              e.target.value ? socket.emit("typing") : socket.emit("stop_typing");
            }}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
import React, { useEffect, useState } from "react";
import "./chat.css";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import Msg from "../Message/Msg";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;

const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  // Function to send messages
  const send = (event) => {
    if (event.type === "keypress" && event.key !== "Enter") return;
    const message = document.getElementById("chatInput").value;
    if (message.trim()) {
      socket.emit("message", { message, id });
      document.getElementById("chatInput").value = "";
    }
  };

  // Initial setup for socket connection and listeners
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });


    socket.on("welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  // Listening for new messages
  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {``
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">Chat Room</div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Msg
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            className="textbox"
            id="chatInput"
            placeholder="Type a message..."
            onKeyPress={send}
          />
          <button onClick={send} className="send">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

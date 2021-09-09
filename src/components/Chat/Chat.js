import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import firebase from "./../../config/fbConfig";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from '../Messages/Messages';



let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const data = queryString.parse(location.search);

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.emit("join", { name:data.name, room: data.room }, () => {});

    return () => {
      socket.emit("disconect");
      // socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      // **********************************
      const db = firebase.firestore();
      let timeStamp= new Date()
      const sentMessage= timeStamp+message
     db.collection("chats").doc(data.room).update
     ({
       sentMessage,
        timeStamp,
         message,
        sentBy: data.name,
      });
      
      // **********************************
    }
  };

  

  return (
    <div className="custOuterContainer ">
      <div className="custContainer z-depth-4">
        <InfoBar room={data.room}/>
        <Messages messages={messages} name={data.name}/>
        {/* {messages.map(meso=>(<div>
          <h3>{meso.user}</h3>
          <p>{meso.text}</p>
        </div>))} */}
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        
      </div>
    </div>
  );
};

export default Chat;

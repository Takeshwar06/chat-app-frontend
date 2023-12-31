import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isDark,setIsDark]=useState(true);
  const [contactHidden,setContactHidden]=useState(true);
  const [showDefaultContact,setShowDefaultContact]=useState(true);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        setShowDefaultContact(false);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
        <div className={`main-container ${isDark===true?"dark":""}`}>
        <div className="container">
          <Contacts showDefaultContact={showDefaultContact} setContactHidden={setContactHidden} contactHidden={contactHidden} contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome setContactHidden={setContactHidden} contactHidden={contactHidden} />
          ) : (
            <ChatContainer contactHidden={contactHidden} setContactHidden={setContactHidden} isDark={isDark} setIsDark={setIsDark} currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}


import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import DefaultContactBoxes from "./DefaultContactBoxes";

export default function Contacts({showDefaultContact,setContactHidden,contactHidden, contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchContacts,setSearchContacts]=useState([]);
  const [searchString,setSearchString]=useState("");
  useEffect(async () => {
    console.log(contactHidden);
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // here if search contact 
  const handleSearchedContact=(e)=>{
    setSearchString(e.target.value)
    const data=contacts.filter((element)=>{
      return(element.username.toLowerCase().includes(e.target.value.toLowerCase()));
    })
    setSearchContacts(data);
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className={`contact-container ${contactHidden===true?"hidden":""}`}>
          <div className="brand">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <h3>ChatCraze</h3>
            </div>
            <div className="searchbar">
              <input value={searchString} name="searchString" onChange={e=>handleSearchedContact(e)} type="text" placeholder="search contact" />
            </div>
          </div>
          <div className="contacts">
            {showDefaultContact&&<DefaultContactBoxes/>}

            {searchString.trim()===""?contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => {changeCurrentChat(index, contact);setContactHidden(!contactHidden)}}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })
            :
            searchContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => {changeCurrentChat(index, contact);setContactHidden(!contactHidden);setSearchString("")}}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })
          }
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

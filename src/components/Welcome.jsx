import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome({setContactHidden,contactHidden}) {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <div>
        <h1>
          Welcome, <span>{userName}!</span>
        </h1>
        <h3>Please <span>select</span> a chat to Start messaging.</h3>
          <button onClick={()=>setContactHidden(!contactHidden)} className="welcome-btn">Let's Chat</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
   width: 100%;
   height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  button{
    margin-top: 12px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    border: 2px solid #f69d2a;
    background-color: #4e0eff;
    cursor: pointer;
  }
  button:hover{
    background-color: #f69d2a;
  }
`;

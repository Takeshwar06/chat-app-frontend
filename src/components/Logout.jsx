import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsFillCloudSunFill } from "react-icons/bs";
import { BsFillCloudMoonFill } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout({setContactHidden,contactHidden,setIsDark,isDark}) {
  const navigate = useNavigate();
  const handleClick = async () => {
    if(window.confirm("do you want to logout")){
      const id = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      const data = await axios.get(`${logoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  return (<>
    <div className="contact-btn">
    <Button onClick={()=>setContactHidden(!contactHidden)}>
      <AiOutlineUserAdd/>
    </Button>
    </div>
    <Button onClick={()=>setIsDark(!isDark)}>
      {
        isDark===true?
        <BsFillCloudSunFill />
        :<BsFillCloudMoonFill />
      }
    </Button>
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
    </>
  );
}

const Button = styled.button`
  display: flex;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: 1px solid black;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

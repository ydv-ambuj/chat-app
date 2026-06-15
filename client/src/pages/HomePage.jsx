import React, { useContext } from "react";
import "./HomePage.css";
import { ChatContext } from "../../context/ChatContext";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  

const { selectedUser,setSelectedUser } = useContext(ChatContext);

  return (
    <div className="home-page">
      <div
        className={`home-container ${
          selectedUser
            ? "three-column-layout"
            : "two-column-layout"
        }`}
      >
        <Sidebar/>

        <ChatContainer/>

        <RightSidebar/>
      </div>
    </div>
  );
};

export default HomePage;

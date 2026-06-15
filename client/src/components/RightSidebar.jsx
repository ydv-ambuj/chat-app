import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const {selectedUser, messages} = useContext(ChatContext)
  const {logout,onlineUsers} = useContext(AuthContext)
  const [msgImages,setMsgImages] = useState([])

  // Get all the images from the message and set them to states
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg=>msg.image).map(msg=>msg.image)
    )
  },[messages])
  return (
    selectedUser && (
      <div
        className={`right-sidebar ${
          selectedUser ? "hide-right-sidebar-mobile" : ""
        }`}
      >
        <div className="profile-section">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="profile-image"
          />

          <h1 className="profile-name">
            {onlineUsers.includes(selectedUser._id) && 
            <span className="profile-online-dot"></span>}
            {selectedUser.fullName}
          </h1>

          <p className="profile-bio">
            {selectedUser.bio}
          </p>
        </div>

        <hr className="sidebar-divider" />

        <div className="media-section">
          <p>Media</p>

          <div className="media-grid">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="media-item"
              >
                <img
                  src={url}
                  alt=""
                  className="media-image"
                />
              </div>
            ))}
          </div>
        </div>

        <button onClick={()=>logout()} className="logout-button">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
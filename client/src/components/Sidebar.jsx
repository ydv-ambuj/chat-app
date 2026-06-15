import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {getUsers, users, selectedUser,
     setSelectedUser, unseenMessages, setUnseenMessages }= useContext(ChatContext);


  const {logout, onlineUsers} = useContext(AuthContext)
  const [input ,setInput] = useState(false)

  const navigate = useNavigate();

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;
   
  useEffect(()=>{
    getUsers();
  },[onlineUsers])


  return (
    <div
      className={`sidebar ${
        selectedUser ? "hide-sidebar-mobile" : ""
      }`}
    >
      <div>
        <div className="sidebar-top">
          <img src={assets.logo} alt="logo" className="sidebar-logo" />

          <div className="menu-container">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="menu-icon"
            />

            <div className="menu-dropdown">
              <p
                onClick={() => navigate("/profile")}
                className="menu-item"
              >
                Edit Profile
              </p>

              <hr />

              <p onClick={()=>logout()} className="menu-item">Logout</p>
            </div>
          </div>
        </div>

        <div className="search-box">
          <img
            src={assets.search_icon}
            alt="Search"
            className="search-icon"
          />

          <input
          onChange={(e)=>setInput(e.target.value)}
            type="text"
            placeholder="Search User..."
            className="search-input"
          />
        </div>
      </div>

      <div className="user-list">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {setSelectedUser(user);
              setUnseenMessages(prev=>({...prev, [user._id]:0}))
            }}
            
            className={`user-card ${
              selectedUser?._id === user._id
                ? "active-user"
                : ""
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="user-avatar"
            />

            <div className="user-info">
              <p>{user.fullName}</p>

              {onlineUsers.includes(user._id) ? (
                <span className="online-status">
                  Online
                </span>
              ) : (
                <span className="offline-status">
                  Offline
                </span>
              )}
            </div>

            {unseenMessages[user._id] > 0 && (
              <p className="unread-count">
                {unseenMessages[user._id] }
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
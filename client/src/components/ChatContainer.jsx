import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {

         const {
                messages,
                selectedUser,
                setSelectedUser,
                sendMessages,
                getMessages
              } = useContext(ChatContext)


   const {authUser, onlineUsers} = useContext(AuthContext)

  const scrollEnd = useRef(null);

  const [input, setInput] = useState('');
  //Handle sending the message

  const handleSendMessage = async (e)=>{
    e.preventDefault();
    if(input.trim()=== "") return null;
    await sendMessages({text : input.trim()});
    setInput("")

  }

  // function to handle sending image

  const handleSendImage = async (e) =>{
    const file = e.target.files[0];
    if(!file || !file.type.startsWith("image/"))
    { toast.error("select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async ()=>{
      await sendMessages({image: reader.result})
      e.target.value = ""
    }
    reader.readAsDataURL(file)

  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])


  useEffect(() => {
    if (scrollEnd.current){
      scrollEnd.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages])

  return selectedUser ? (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <img
          src={selectedUser.profilePic  || assets.avatar_icon}
          alt=""
          className="header-profile"
        />

        <p className="header-name">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) &&
         ( <span className="online-dot"></span>)}
        </p>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="back-btn"
        />

        <img
          src={assets.help_icon}
          alt=""
          className="help-btn"
        />
      </div>

      {/* Chat Area */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.senderId === authUser._id
                ? "reverse"
                : ""
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="message-image"
              />
            ) : (
              <p
                className={`message-text ${
                  msg.senderId ===
                  authUser._id
                    ? "sender"
                    : "receiver"
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="message-info">
              <img
                src={
                  msg.senderId === authUser._id
                  ? authUser?.profilePic || assets.avatar_icon
                : selectedUser?.profilePic || assets.avatar_icon
                 }
                alt=""
                className="message-avatar"
              />

              <p className="message-time">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}

        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Area */}
      <div className="chat-footer">
        <div className="message-input-box">
          <input
          onChange={(e)=>setInput(e.target.value)} value={input}
          onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null}
            type="text"
            placeholder="Send a message"
            className="message-input"
          />

          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />

          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="gallery-icon"
            />
          </label>
        </div>

        <img
            onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className="send-btn"
        />
      </div>
    </div>
  ) : (
    <div className="empty-chat">
      <img
        src={assets.logo_icon}
        className="logo-icon"
        alt=""
      />
      <p className="empty-text">
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;

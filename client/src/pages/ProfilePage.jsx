import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const {authUser,updateProfile} = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name,bio});
       navigate('/');
       return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName:name, bio});
       navigate('/');

    }
   
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <form
          onSubmit={handleSubmit}
          className="profile-form"
        >
          <h3 className="profile-title">
            Profile details
          </h3>

          <label
            htmlFor="avatar"
            className="upload-label"
          >
            <input
              onChange={(e) =>
                setSelectedImg(e.target.files[0])
              }
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />

            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`avatar-preview ${
                selectedImg
                  ? "avatar-rounded"
                  : ""
              }`}
            />

            Upload profile image
          </label>

          <input
            onChange={(e) =>
              setName(e.target.value)
            }
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="profile-input"
          />

          <textarea
            onChange={(e) =>
              setBio(e.target.value)
            }
            value={bio}
            placeholder="Write profile bio"
            required
            rows={4}
            className="profile-textarea"
          ></textarea>

          <button
            type="submit"
            className="save-btn"
          >
            Save
          </button>
        </form>

        <img
          className="profile-logo"
          src={authUser?.profilePic || assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;

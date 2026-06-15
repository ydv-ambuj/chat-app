import React, { useContext, useState } from "react";
import "./LoginPage.css";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passward, setPassward] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

 const onSubmitHandler = (event) => {
  event.preventDefault();

  login(
    currState === "Sign up" ? "signup" : "login",
    {
      fullName,
      email,
      passward,
      bio,
    }
  );
};

  return (
    <div className="login-page">
      {/* ------ left ------- */}
      <img
        src={assets.logo_big}
        alt=""
        className="login-logo"
      />

      {/* ------ right ------- */}
      <form
        onSubmit={onSubmitHandler}
        className="login-form"
      >
        <h2 className="login-heading">
          {currState}

          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="back-arrow"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="login-input"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="login-input"
            />

            <input
              onChange={(e) => setPassward(e.target.value)}
              value={passward}
              type="password"
              placeholder="Password"
              required
              className="login-input"
            />
          </>
        )}

        {currState === "Sign up" &&
          !isDataSubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              className="login-textarea"
              placeholder="Provide a short bio..."
              required
            ></textarea>
          )}

        <button
          type="submit"
          className="login-btn"
        >
          {currState === "Sign up"
            ? "Create Account"
            : "Login Now"}
        </button>

        <div className="checkbox-box">
          <input type="checkbox" />
          <p>
            Agree to the terms of use &
            privacy policy.
          </p>
        </div>

        <div className="bottom-text">
          {currState === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="switch-btn"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                onClick={() =>
                  setCurrState("Sign up")
                }
                className="switch-btn"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../src/img/Logo.svg";
import axios from "axios";
import showpass from "../src/img/hide-password.svg";

const Login = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    if (emailError === "" && passwordError === "") {
      const user = {
        useremail: email,
        userpass: password,
      };
      console.log(user);
      axios.post("http://localhost:8081/Login", user).then(
        (res) => {
          setLogin(res.data.user);
          console.log(res.data.auth);
          console.log(res.data.user);
          if (res.data.message === "Login Successful") {
            localStorage.setItem('token',res.data.auth);
            navigate("/Dashboard");
          } else {
            console.log(res.data.message);
            setUserError(res.data.message);
          }
        },
        [setLogin]
      );
    }
  };

  return (
    <div className={"mainContainer"}>
      <img src={logo} alt="logo" />
      <p>Online Project Management</p>
      <div className="Loginbox">
        <div className={"titleContainer"}>
          <p>Login to get started</p>
        </div>
        <br />
        <div className={"inputContainer"}>
          <label className="email">Email</label>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={handleEmailChange}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer passimgs"}>
          <label className="pass">Password</label>
          <input
            value={password}
            placeholder="Enter your password here"
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordChange}
            className={"inputBox"}
          />
          <img
            src={showPassword ? showpass : showpass}
            alt={showPassword ? "Show Password" : "Hide Password"}
            onClick={togglePasswordVisibility}
            className="password-toggle"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={"Log in"}
          />
          <label className="errorLabel">{userError}</label>
        </div>
      </div>
    </div>
  );
};

export default Login;

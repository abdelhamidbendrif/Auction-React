import React, { useState } from "react";
import Header from "./Header";
import './login.css';
import Image from "../assets/image-removebg-preview.png";
import Logo from "../assets/istockphoto-1368360794-612x612.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function login() {
    console.warn(email, password);
    let Item = { email, password };
    console.warn(Item);

    let result = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(Item),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (result.status === 200) {
      result = await result.json();
      console.warn("result", result);
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/Home");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div>
      <Header />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="login-main">
        <div className="login-left">
          <img src={Image} alt="" />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src={Logo} alt="" />
            </div>
            <div className="login-center">
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <div className="pass-input-div">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                  {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
                </div>
                <div className="login-center-options">
                  <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" />
                  </div>
                  <a href="#" className="forgot-pass-link">Forgot password?</a>
                </div>
                <div className="login-center-buttons">
                  <Button onClick={login} className="custom-btn mt-5 font-b"> Log In </Button>
                </div>
              </form>
            </div>
            <p className="login-bottom-p">Don't have an account? <a href="/Register">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

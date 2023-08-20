import "../ComponentsCss/NavBar.css";
import { FaTwitter } from "react-icons/fa";
import * as React from "react";
import { useNavigate } from 'react-router-dom';

const NavBar = ({user, setUser}) => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const loggedIn = user != null;

    const onLogoClick = React.useCallback(() => {
        navigate('/home');
    }, [navigate]);
    const onSignUp = React.useCallback(() => {
        navigate('/sign-up');
    }, [navigate]);
    const onEmailChange = React.useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);
    const onPasswordChange = React.useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    const onLogin = React.useCallback(async () => {
        console.log(email, password);
        const response = await fetch("http://127.0.0.1:3000/user/login", {
            method: "POST",
            headers: {  
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const user = await response.json();
        setUser(user);
    }, [setUser]);

    const onLogout = React.useCallback(() => {
        setUser(null);
    }, [setUser]);

    return (
      <div className="nav-bar">
        <FaTwitter className="twitter-logo fs-1 mb-5" onClick={onLogoClick}></FaTwitter>
        {
            !loggedIn && 
            <div className="credentials">
                <input className="me-2" type="email" placeholder="Your email" value={email} onChange={onEmailChange}></input>
                <input type="password" placeholder="Your password" value={password} onChange={onPasswordChange}></input>
            </div>
        }
        {
            !loggedIn && 
            <div className="login-buttons">
                <button onClick={onLogin} className="btn-light custom-button">Log in</button>
                <button onClick={onSignUp} className="signup-button btn-light custom-button">Sign up</button>
            </div>
        }
        {
            loggedIn && 
            <div className="logout-buttons">
                <button onClick={onLogout} className="logout-button">Log out</button>
            </div>
        }
      </div>
    )
  }
  
  export default NavBar;
import "../ComponentsCss/NavBar.css";
import { FaTwitter } from "react-icons/fa";
import * as React from "react";
import { useNavigate } from 'react-router-dom';

const NavBar = ({user, setUser}) => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const avatarImage = React.useMemo(() => {
        if (user != null && user.avatar.length > 0) {
            return user.avatar;
        }
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStt8Ue2ZBqbY1HGhCxwV_G6bh5-E3-ggkXAQ&usqp=CAU";
    }, [user])

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
        const response = await fetch("http://127.0.0.1:3306/user/login", {
            method: "POST",
            headers: {  
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if (response.ok) {
            const user = await response.json();
            setUser(user);
            window.confirm("Logged in successfully!");
        } else {
            window.alert("Login failed! Please check your credentials!");
        }
    }, [setUser, email, password]);

    const onLogout = React.useCallback(() => {
        setUser(null);
    }, [setUser]);

    return (
      <div className="nav-bar">
        <FaTwitter className="twitter-logo fs-1 mb-5" onClick={onLogoClick}></FaTwitter>
        {
            !loggedIn && 
            <div className="credentials">
                <div>
                    <input className="login-input" type="email" placeholder="Your email" value={email} onChange={onEmailChange}></input>
                </div>
                <div className="password-input">
                    <input className="login-input" type="password" placeholder="Your password" value={password} onChange={onPasswordChange}></input>
                </div>
                
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
                <img className="avatar-image" src={avatarImage} alt="Your Image" />
                <div>
                    <div className="user-name">{user.name}</div>
                    <button onClick={onLogout} className="logout-button">Log out</button>
                </div>
            </div>
        }
      </div>
    )
  }
  
  export default NavBar;
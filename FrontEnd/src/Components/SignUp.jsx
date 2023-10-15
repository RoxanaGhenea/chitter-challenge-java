import React from 'react';
import "../ComponentsCss/SignUp.css";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [confirmedPassword, setConfirmedPassword] = React.useState("");

    const onNameChange = React.useCallback((e) => {
        setName(e.target.value);
    }, [setName]);
    const onUsernameChange = React.useCallback((e) => {
        setUsername(e.target.value);
    }, [setUsername]);
    const onEmailChange = React.useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);
    const onPasswordChange = React.useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);
    const onAvatarChange = React.useCallback((e) => {
        setAvatar(e.target.value);
    }, [setAvatar]);
    const onConfirmedPasswordChange = React.useCallback((e) => {
        setConfirmedPassword(e.target.value);
    }, [setConfirmedPassword]);
    const isSubmitDisabled = React.useMemo(() => {
        return username.length == 0 || name.length == 0 || email.length == 0 || password.length == 0 || password !== confirmedPassword;
    }, [password, confirmedPassword]);

    const onSubmit = React.useCallback(async () => {
        try {
            const response = await fetch("http://127.0.0.1:3000/user/add", {
                method: "POST",
                headers: {  
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                    username: username,
                    avatar: avatar,
                }),
            });
            if (response.ok) {
                navigate('/home');
                window.confirm("Sign up successful!");
            } else {
                window.alert("Sign up failed! This could be due to duplicate email or username!");
            }
        } catch (e) {
            console.log(e);
        }
    }, [email, password, name, username, confirmedPassword]);

    return (
        <div className='d-flex page-body'>
            <div className='d-flex flex-column'>
                <div>
                    <h3 className="text-black mb-3">Happening Now</h3>
                </div>
                <div className='sign-up-form'>
                    <form>
                        <label htmlFor="name">Your Name:</label><br />
                        <input className='sign-up-input' value={name} onChange={onNameChange} type="text" id="name" name="name" placeholder="Your name" /><br />
                        <label htmlFor="email-address">Your email address:</label> <br />
                        <input className='sign-up-input' value={email} onChange={onEmailChange} type="email" id="email-address" name="email-address" placeholder="Your email" /> <br />
                        <label htmlFor="username">Please  choose your username:</label> <br />
                        <input className='sign-up-input' value={username} onChange={onUsernameChange} type="text" id="username" name="username" placeholder="Your username" /> <br />
                        <label htmlFor="avatar">Please choose a link for your avatar:</label> <br />
                        <input className='sign-up-input' value={avatar} onChange={onAvatarChange} type="text" id="avatar" name="avatar" placeholder="Link to your avatar" /> <br />
                        <label htmlFor="pwd">Password:</label> <br />
                        <input className='sign-up-input' value={password} onChange={onPasswordChange} type="password" id="pwd" name="pwd"></input> <br />
                        <label htmlFor="confirmPwd">Confirm password:</label> <br />
                        <input className='sign-up-input' value={confirmedPassword} onChange={onConfirmedPasswordChange} type="password" id="confirmPwd" name="pwd"></input> <br />
                    </form>
                </div>
                <div>
                    <div className='submit-wrapper'>
                        <button disabled={isSubmitDisabled} onClick={onSubmit} className="btn btn-light custom-button mb-2 submit-button" type="button">Create Account</button>
                    </div>
                    
                    <p className="text-black text-extra-small">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

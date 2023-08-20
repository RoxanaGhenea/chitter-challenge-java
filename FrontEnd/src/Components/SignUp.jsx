import React from 'react';
import "../ComponentsCss/SignUp.css";

const SignUp = () => {
    return (
        <div className='d-flex page-body'>
            <div className='d-flex flex-column'>
                <div>
                    <h3 className="text-black mb-3">Happening Now</h3>
                    <h4 className="text-black mb-3">Join Today</h4>
                    <button className="btn btn-light custom-button mb-2" type="button">Create Account</button>
                    <p className="text-black text-extra-small mb-3">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                </div>
                <div>
                    <form>
                        <label htmlFor="name">Your Name:</label><br />
                        <input type="text" id="name" name="name" defaultValue="John Doe" /><br />
                        <label htmlFor="email-address">Your email address:</label> <br />
                        <input type="email" id="email-address" name="email-address" defaultValue="..." /> <br />
                        <label htmlFor="username">Please  choose your username:</label> <br />
                        <input type="text" id="username" name="username" defaultValue="..." /> <br />
                        <label for="pwd">Password:</label> <br />
                        <input type="password" id="pwd" name="pwd"></input> <br />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

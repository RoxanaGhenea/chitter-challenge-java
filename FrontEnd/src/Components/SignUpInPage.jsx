// import FcGoogle from "react-fc-components/FcGoogle";
import '../ComponentsCss/SignUpInPage.css';

const SignUpInPage = () => {
    return (
        <>
            <body>
                <div className="d-flex logo-position">
                    <div>
                        <img src="https://admin.itsnicethat.com/images/MEPeS1j8IRTti1OF_E9ajuZSAJw=/243516/width-1440/twitter-x-logo-graphic-design-itsnicethat-01.jpeg" alt="Logo" width="400px" height="400px" />
                    </div>
                    <div>
                        <div className="d-grid gap-2 col-8 mx-auto">
                            <h1 className="text-white">Happening Now</h1>
                            <h3 className="text-white">Join Today</h3>
                            <button className="btn btn-light custom-button" type="button">Sign up with Google</button>
                            <button className="btn btn-light custom-button" type="button">Sign up with Apple</button>
                            <p className="text-white">or</p>
                            <button className="btn btn-light custom-button" type="button">Create Account</button>
                            <p className="text-white text-extra-small">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                            <h5 className="text-white">Already have an account?</h5>
                            <button className="btn btn-light custom-button" type="button">Sign in</button>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}

export default SignUpInPage;

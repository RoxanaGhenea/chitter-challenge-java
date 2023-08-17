import '../ComponentsCss/SignUpInPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';

const SignUpInPage = () => {
    return (
        <>
            <div className='d-flex flex-column align-items-start'>
                <h3 className="text-black mb-3">Happening Now</h3>
                <h4 className="text-black mb-3">Join Today</h4>
                <button className="btn btn-light custom-button mb-2" type="button"><FontAwesomeIcon icon={faGoogle} className="fs-6 me-2" />Sign up with Google</button>
                <button className="btn btn-light custom-button mb-3" type="button"><FontAwesomeIcon icon={faApple} className="fs-4 me-2"  />Sign up with Apple</button>
                <p className="text-black mb-3 h5"><b>or</b></p>
                <button className="btn btn-light custom-button mb-2" type="button">Create Account</button>
                <p className="text-black text-extra-small mb-3">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                <h5 className="text-black mb-2">Already have an account?</h5>
                <button className="btn btn-light custom-button mb-3" type="button">Sign in</button>
            </div>
        </>
    );
}

export default SignUpInPage;

import React, { useRef } from "react";
import {auth} from './firebase'
import { useHistory } from "react-router-dom";
import "./SignUpScreen.css";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  const SignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        // history.push("/movies");
        // return authUser.user.updateProfile({
        //   displayName: emailRef.current.value, //when user is created then add the username value to displayName attribute
        // });
      })
      .catch((error) => alert(error.message));
  };

  const SignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(emailRef.current.value,
        passwordRef.current.value)
      .then((loggedinnUser) => {
        // loggedinnUser.user.displayName
        //   ? history.push("/movies")
        //   : history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signUpScreen">
      <form>
        <h2>Sign In</h2>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          // innerRef={(input) => (this.email = input)}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          // innerRef={(input) => (this.email = input)}
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          ref={passwordRef}
        />
        <button type="submit" value="submit" color="danger" onClick={SignIn}>
          Sign In
        </button>
        <h5>
          <span className="signUpScreen_gray">New to Netflix?</span>
          <span className="signUpScreen_link" onClick={SignUp}>
            Sign Up now
          </span>
        </h5>
      </form>
    </div>
  );
}

export default SignUpScreen;

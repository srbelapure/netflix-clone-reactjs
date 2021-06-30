import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

import "./Login.css";

function Login() {
  const [modalState, setModalState] = useState(false); // for login modal
  const [signupModalState, setSignupModalState] = useState(false); // for sign up modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userloggedinn, setUserLoggedInn] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //if user has logged inn
        setUserLoggedInn(authUser);
      } else {
        // if user has loggedd out
        setUserLoggedInn(null); // if user logs out set user to null
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleModal = () => {
    setModalState(!modalState);
    setEmail("")
    setPassword("")
  };

  const toggleSignUpModal = () => {
    setSignupModalState(!signupModalState)
    setEmail("")
    setPassword("")
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((loggedinnUser) => {
        loggedinnUser.user.displayName
          ? history.push("/movies")
          : history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
    setModalState(false);
    setEmail("")
    setPassword("")
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password) // email,password -> these are values from state
      .then((authUser) => {
        history.push("/movies");
        return authUser.user.updateProfile({
          displayName: email, //when user is created then add the username value to displayName attribute
        });
      })
      .catch((error) => alert(error.message));
    setSignupModalState(false);
    setEmail("")
    setPassword("")
  };

  const onLogOut = () => {
    auth.signOut();
    history.push("/");
  };

  console.log(
    "userloggedinn**************************",
    userloggedinn,
    userloggedinn?.displayName
  );

  return (
    <>
      <div className="login_signup_buttons">
        {userloggedinn?.displayName ? (
          <Button className="logout_button" outline onClick={onLogOut}>
            Logout
          </Button>
        ) : (
          <>
            <Button className="login_button" outline onClick={toggleModal}>
              Login
            </Button>
            <Button
              className="signup_button"
              outline
              onClick={toggleSignUpModal}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
      <Modal
        className="login_signup_modal"
        isOpen={modalState}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup className="netflix_form_group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                // innerRef={(input) => (this.email = input)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="netflix_form_group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // innerRef={(input) => (this.password = input)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            {/* <FormGroup>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  innerRef={(input) => (this.remember = input)}
                />
                Remember me
              </label>
            </FormGroup> */}
            <Button type="submit" value="submit" color="danger">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        className="signup_modal"
        isOpen={signupModalState}
        toggle={() => setSignupModalState(!signupModalState)}
      >
        <ModalHeader toggle={() => setSignupModalState(!signupModalState)}>
          Sign Up
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSignUp}>
            <FormGroup className="netflix_form_group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                // innerRef={(input) => (this.email = input)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="netflix_form_group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // innerRef={(input) => (this.password = input)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            {/* <FormGroup>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  innerRef={(input) => (this.remember = input)}
                />
                Remember me
              </label>
            </FormGroup> */}
            <Button type="submit" value="submit" color="danger">
              Sign Up
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Login;

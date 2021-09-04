import React,{useState} from "react";
import SignUpScreen from './SignUpScreen'
import "./HomePage.css";

function HomePage() {
  const [signIn, setSignIn] = useState(false)
  return (
    <>
      <div
        className="home_page_container"
        style={{
          backgroundSize: "cover",
          // backgroundSize: "cover",
          backgroundImage: `url(
        "https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_small.jpg")`,
          backgroundPosition: "center center",
          height: "100vh",
        }}
      >
        <div className="home_page_gradient"></div>
        {/* <img
      src="https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_small.jpg"
      alt="Netflix home page"
      /> */}
      </div>
      <div className="home_page_description">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h3 style={{ textAlign: "center" }}>
              Watch anywhere. Cancel anytime.
            </h3>
            <h6 style={{ fontWeight: "normal", margin: "20px" }}>
              Ready to watch? Enter your email to create or restart your
              membership
            </h6>
            <div className="home_screen_input">
              <form>
                <input type="email" placeholder="email address" />
                <button
                  className="home_screen_input_button"
                  onClick={()=>setSignIn(true)}
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;

import React from "react";
import './HomePage.css'

function HomePage() {
  return (
    // <div
    //  className="landing_page_image"
    // //  style={{
    // //   backgroundSize: "cover",
    // //   // backgroundSize: "cover",
    // //   backgroundImage: `url(
    // //       "https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_small.jpg")`,
    // //   backgroundPosition: "center center"
    // // }}
    //  >
    //   <img
    //     src="https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_small.jpg"
    //     alt="Netflix home page image"
    //     height="100%"
    //     width="100%"
    //   />
    // </div>
    <div
      className="home_page_container"
      style={{
        backgroundSize: "cover",
        // backgroundSize: "cover",
        backgroundImage: `url(
        "https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_small.jpg")`,
        backgroundPosition: "center center",
        height: "100vh"
      }}
    >
      <div className="home_page_description">
        <h1>Unlimited movies, TV shows and more.</h1>
        <h3 style={{textAlign:"center"}}>Watch anywhere. Cancel anytime.</h3>
      </div>
    </div>
  );
}

export default HomePage;



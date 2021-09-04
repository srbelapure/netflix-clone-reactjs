import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const netflixPlanOptions = [
    {
      id: 1,
      name: "Netflix Standard",
      price: "199",
    },
    {
      id: 2,
      name: "Netflix Basic",
      price: "499",
    },
    {
      id: 3,
      name: "Netflix Premiun",
      price: "1999",
    },
  ];

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };
  return (
    <div className="profilescreen">
      <Nav />
      <div className="edit_profile_section">
        <h2
          style={{
            fontWeight: "400",
            borderBottom: "1px solid gray",
            width: "33vw",
          }}
        >
          Edit Profile
        </h2>
        <div className="edit_profile_sub_section">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt="User profile logo"
            style={{
              height: "10vh",
              width: "10vw",
              objectFit: "contain",
            }}
          />
          <div className="user_plans_section">
            <div className="logged_in_user">
              {user ? user.email : "not logged inn"}
            </div>
            <div className="plans">
              <div className="current_user_plan">
                Plans(Current Plan:premium)
              </div>
              {/* <hr/> */}
              <div className="plans_renewal_date">
                Renewal date : display a date
              </div>
              <div className="plans_options">
                {netflixPlanOptions.map((option) => {
                  return (
                    <div key={option.id}>
                      <div className="plan_name_price">
                      <span>{option.name}</span>
                      <span className="plan_price"> {option.price}</span>
                      </div>
                      <button className="plan_subscribe_button" type="button">
                        Subscribe
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              className="user_profile_logout_button"
              type="button"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;

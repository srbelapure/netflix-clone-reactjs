import React,{useState} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import "./ProfileScreen.css";

var todaysDate = new Date();
var numberOfDaysToAdd = 10;
todaysDate.setDate(todaysDate.getDate() + numberOfDaysToAdd);
var dd = todaysDate.getDate();
var mm = todaysDate.getMonth() + 1;
var y = todaysDate.getFullYear();

var renewalFormattedDate = mm + '/'+ dd + '/'+ y;

function ProfileScreen() {
  const [netflixPlan, setNetflixPlan] = useState(localStorage.getItem('selectedNetflixPlan'))
  const [renewalDate, setRenewalDate] = useState(renewalFormattedDate)
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
      name: "Netflix Premium",
      price: "1999",
    },
  ];

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };

  const subscribePlan =(optionSelected)=>{
    localStorage.setItem('selectedNetflixPlan',optionSelected.name)
    setNetflixPlan(localStorage.getItem('selectedNetflixPlan'))
  }
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
              marginRight:'5px',
            }}
          />
          <div className="user_plans_section">
            <div className="logged_in_user">
              User : {user ? user.email : "not logged inn"}
            </div>
            <div className="plans">
              <div className="current_user_plan">
                Current Plan : {netflixPlan}
              </div>
              {/* <hr/> */}
              <div className="plans_renewal_date">
                Renewal date : {renewalDate}
              </div>
              <div className="plans_options">
                {netflixPlanOptions.map((option) => {
                  return (
                    <div key={option.id}>
                      {
                        localStorage.getItem('selectedNetflixPlan') === option.name ?
                        <div className="highlight_selected_plan">
                          <div className="plan_name_price">
                          <span>{option.name}</span>
                          <span className="plan_price"> {option.price}</span>
                          </div>
                          <button className="plan_subscribe_button" type="button" onClick={()=>subscribePlan(option)}>
                            Subscribe
                          </button>
                        </div>
                        :
                        <>
                          <div className="plan_name_price">
                          <span>{option.name}</span>
                          <span className="plan_price"> {option.price}</span>
                          </div>
                          <button className="plan_subscribe_button" type="button" onClick={()=>subscribePlan(option)}>
                            Subscribe
                          </button>
                        </>
                      }
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

import React,{useState,useEffect} from "react";
import Login from './Login'
import { useHistory } from "react-router-dom";
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)
    const history = useHistory();

    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true)
            }
            else{
                handleShow(false)
            }
        })
        return()=>{
            //before firing the effect again remove the earlier event listner
            window.removeEventListener("scroll",()=>{})
        }
    }, [])
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        onClick={()=>history.push("/")}
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        onClick={()=>history.push("/profile")}
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="Netflix Logo"
      />
      
      <Login/>
    </div>
  );
}

export default Nav;

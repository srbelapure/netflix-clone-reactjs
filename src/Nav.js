import React,{useState,useEffect} from "react";
import Login from './Login'
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)
    const history = useHistory();

    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY>10){
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

    const onLogoClick=()=>{
      if(window.location.pathname==='/profile'){
        history.push("/movies")
      }
      else if(window.location.pathname==='/movies'){
        auth.signOut();
        history.push("/")
      }
      else if(window.location.pathname.includes("/tv/")){
        history.push("/movies")
      }
    }
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        onClick={onLogoClick}
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        style={{cursor:"pointer"}}
      />
      <Login/>
    </div>
  );
}

export default Nav;

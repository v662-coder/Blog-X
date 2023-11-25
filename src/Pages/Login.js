import React from "react";
import {auth,provider} from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login ({setIsAuth}) {
  let navigate= useNavigate();
  const signInWithgoogle=()=>{
    console.log("clicked1");
signInWithPopup(auth,provider).then(()=>{
localStorage.setItem("isAuth",true);

setIsAuth(true);
navigate("/")
});
  };
  return (
    <div className='loginPage'>
      <p>sign in with google</p>
      <button  className="login-with-google-btn" onClick={signInWithgoogle}>Sign in with google</button>
    
    </div>
  );
}

export default Login
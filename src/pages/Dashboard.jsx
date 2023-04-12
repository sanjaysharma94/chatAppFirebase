import React from "react";
import { useSelector } from "react-redux";
import { sendEmailVerification } from "firebase/auth";
import {auth} from "../firebase"
import {Navigate, useLocation} from "react-router-dom"

function Dashboard() {
  let location = useLocation();
  const user = useSelector((store) => store.credential.user);
  let token = sessionStorage.getItem("usertoken")
  // const userDetail = 
  token = JSON.parse(token)
  document.cookie = ` bearer = ${token.stsTokenManager.accessToken} ;expires=wed , 12 Apr 2023 13:15:00 UTC; path=/;`
  console.log("coockies",(document.cookie))


  const VerifyEmail = async () => {
    try {
      await sendEmailVerification(user);
      alert("email sent");
      console.log(auth.currentUser)
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <div>
      welcome to main chat page
      <button onClick={VerifyEmail}>Verify Email</button>
      <h1>{token.displayName}</h1>
      
    </div>
  );
}

export default Dashboard;

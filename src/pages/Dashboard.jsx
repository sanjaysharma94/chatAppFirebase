import React from "react";
import { useSelector } from "react-redux";
import { sendEmailVerification } from "firebase/auth";
import {auth} from "../firebase"

function Dashboard() {
  const user = useSelector((store) => store.credential.user);
  console.log(user)

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
    </div>
  );
}

export default Dashboard;

import React from 'react';
import {useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Login() {

const [loginCredentials , setLoginCredentials ] = React.useState({
    "email" : "",
    "password" : "",
})

const handleChange = (e)=>{
    setLoginCredentials({
        ...loginCredentials,
        [e.target.name]:e.target.value
    })
}
const handleSubmit = (e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    
}
const navigate = useNavigate()
  return (
    <div className='formContainer'>
        <span className='links' >Login to chat app</span>
     <form  onSubmit={handleSubmit} className='form-elements'>
        <label htmlFor="">Email :</label>
        <input type="email" id="email" required onChange={handleChange} name="email" />
        <label htmlFor="">password :</label>
        <input type="password" id="password" required onChange={handleChange} name="password"  />
        <input type="submit" value="Submit" />
     </form>
        <p>New to chat App <span onClick={()=>navigate("/register")}className='links' >Register</span></p>
    </div>
  )
}

export default Login
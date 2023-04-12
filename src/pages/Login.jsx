import React from 'react';
import {useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux"
import {user} from "../Redux/action"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userinfo = useSelector((store) => store.credential.user)

    if(userinfo.accessToken) navigate('/')

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
                sessionStorage.setItem("usertoken",JSON.stringify(userCredential.user))
                 dispatch(user(userCredential.user));
                
            })
            .catch((error) => {
                alert(error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    
}

  return (
    <div>
    <div className='formContainer'>
        <span className='links' >Login to chat app</span>
     <form  onSubmit={handleSubmit} className='form-elements'>
        
        <div className="child-div">
        <label htmlFor="">Email :</label>
        <input type="email" id="email" required onChange={handleChange} name="email" />
        </div>
        <div className="child-div">
        <label htmlFor="">password :</label>
        <input type="password" id="password" required onChange={handleChange} name="password"  />
        </div>
        <input type="submit" value="Submit" className='button' />
     </form>
        <p>New to chat App ?<span onClick={()=>navigate("/register")}className='links' >Register</span></p>
    </div>
    </div>
  )
}

export default Login
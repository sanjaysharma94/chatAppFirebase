import React from 'react'
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword  ,updateProfile} from "firebase/auth";
import { auth ,app} from "../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux"
import {user} from "../Redux/action"

function Register() {

    const dispatch = useDispatch();

    const [registerCredentials, setRegisterCredentials] = React.useState({
        "email": "",
        "password": "",
        "displayName": "",
        })

    const [userImage , setuserImage] = React.useState(null)

    const handleChange = (e) => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value
        })  
      }
         


  const userinfo = useSelector((store) => store.credential.user)

     console.log(userinfo)
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(userImage==null) return
        
    createUserWithEmailAndPassword(auth, registerCredentials.email, registerCredentials.password)
            .then((userCredential) => {
                dispatch(user(userCredential.user))
                const storage = getStorage(app);
                const storageRef = ref(storage, userImage.name);

                const uploadTask = uploadBytesResumable(storageRef, userImage , { contentType: 'image/png' });
                uploadTask.on(
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            
                                updateProfile(auth.currentUser, {
                                    displayName: registerCredentials.displayName,
                                    photoURL:downloadURL
                                  }).then(() => {
                                    console.log("user has been updated++++++++++++++++++")
                                  }).catch((error) => {
                                    console.log("user not updated",error)
                                  });    
                            }).catch((err)=>{
                                console.log("download url not updated",err)
                            })
                    }
                );
            })
            .catch((error) => {
                
                console.log( error.message)
            });

    }



    const navigate = useNavigate()
    return (
        <div>

            <div className='formContainer'>
                <span className='links' >Register to chat app</span>
                <form onSubmit={handleSubmit} className='form-elements'>
                    <div className='child-div'>
                    <label htmlFor="">Display name :</label>
                    <input type="text" onChange={handleChange} name="displayName" id="displayName" />
                    </div>
                    <div className='child-div'>
                    <label htmlFor="">Email :</label>
                    <input type="email" onChange={handleChange} name="email" id="email" />
                    </div>
                    <div className='child-div'>
                    <label htmlFor="">password :</label>
                    <input type="password" onChange={handleChange} name="password" id="password" />
                    </div>
                    <div className='child-div'>
                    <input type="file" onChange={(e)=>setuserImage(e.target.files[0])} name="photoURL" id="photoURL" />
                    </div>
                    
                    <input type="submit" value="Submit" className='button'/>
                </form>
                <p>Already have an account ?<span onClick={() => navigate("/login")} className='links'>Login</span></p>
            </div>


        </div>
    )
}

export default Register

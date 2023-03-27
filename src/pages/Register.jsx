import React from 'react'
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword  ,updateProfile} from "firebase/auth";
import { auth } from "../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Register() {

    const [registerCredentials, setRegisterCredentials] = React.useState({
        "email": "",
        "password": "",
        "displayName": "",
        "photoURL":"",

    })

    const handleChange = (e) => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value
        })

       
    }

    console.log(registerCredentials)
    const handleChange1 = (e) => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]:  e.target.files[0]
        })

       
     }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerCredentials)

//         console.log(registerCredentials)
        

//         createUserWithEmailAndPassword(auth, registerCredentials.email, registerCredentials.password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log(user)
               

// const storage = getStorage();
// const storageRef = ref(storage, registerCredentials.photoURL);

// const uploadTask = uploadBytesResumable(storageRef, registerCredentials.photoURL.name,{contentType: 'image/png'});

// // Register three observers:
// // 1. 'state_changed' observer, called any time the state changes
// // 2. Error observer, called on failure
// // 3. Completion observer, called on successful completion
// uploadTask.on('state_changed', 
//   (snapshot) => {
   
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//     });
//   }
// );
//                 updateProfile(auth.currentUser, {
//                     displayName: registerCredentials.displayName
//                   }).then(() => {
//                     // Profile updated!
                    
//                     // ...
//                   }).catch((error) => {
//                     // An error occurred
//                     // ...
//                   });
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage)
//             });

    }



    const navigate = useNavigate()
    return (
        <div>

            <div className='formContainer'>
                <span className='links' >Register to chat app</span>
                <form onSubmit={handleSubmit} className='form-elements'>
                    <label htmlFor="">Display name :</label>
                    <input type="text" onChange={handleChange} name="displayName" id="displayName" />
                    <label htmlFor="">Email :</label>
                    <input type="email" onChange={handleChange} name="email" id="email" />
                    <label htmlFor="">password :</label>
                    <input type="password" onChange={handleChange} name="password" id="password" />
                    <input type="file" onChange={handleChange1} name="photoURL" id="photoURL" />
                    <input type="submit" value="Submit" />
                </form>
                <p>Already have an account <span onClick={() => navigate("/")} className='links'>Login</span></p>
            </div>


        </div>
    )
}

export default Register

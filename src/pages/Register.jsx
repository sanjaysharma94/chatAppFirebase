import React from 'react'
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword  ,updateProfile} from "firebase/auth";
import { auth ,app , db} from "../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useDispatch, useSelector } from "react-redux"
import {user} from "../Redux/action"
import Add from "../assets/download.jpeg"

function Register() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const storage = getStorage(app);
    const [err, setErr] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

   
         


  const userinfo = useSelector((store) => store.credential.user)

     //console.log(userinfo)
  
    // const handleSubmit = async(e) => {
    //     e.preventDefault();

    // const displayName = e.target[0].value;
    // const email = e.target[1].value;
    // const password = e.target[2].value;
    // const file = e.target[3].files[0];
        
    // createUserWithEmailAndPassword(auth, email, password)
    //         .then((res) => {
    //             dispatch(user(res.user))
                
    //             const storageRef = ref(storage, file.name);

    //             const uploadTask = uploadBytesResumable(storageRef, file );
    //             uploadTask.on(
    //                 () => {
    //                     getDownloadURL(uploadTask.snapshot.ref)
    //                     .then((downloadURL) => {
                            

    //                             updateProfile(auth.currentUser, {
    //                                 displayName: displayName,
    //                                 photoURL:downloadURL
    //                               }).then(async() => {
    //                                 await setDoc(doc(db, "users", user.uid), {
    //                                     displayName:displayName,
    //                                     uid:user.uid,
    //                                     email:email,
    //                                     photoURL:downloadURL
    //                                   });
    //                                 console.log("user has been updated++++++++++++++++++")
    //                               }).catch((error) => {
    //                                 console.log("user not updated",error)
    //                               });    
    //                         }).catch((err)=>{
    //                             console.log("download url not updated",err)
    //                         })
    //                 }
    //             );
    //         })
    //         .catch((error) => {
                
    //             console.log( error.message)
    //         });


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
            //update user in redux
            dispatch(user(res.user))

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file ,{ contentType: 'image/png' }).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

    
    return (
        <div>

            <div className='formContainer'>
                <span className='links' >Register to chat app</span>
                <form onSubmit={handleSubmit} className='form-elements'>
                    <div className='child-div'>
                    <label htmlFor="">Display name :</label>
                    <input type="text" name="displayName" id="displayName" />
                    </div>
                    <div className='child-div'>
                    <label htmlFor="">Email :</label>
                    <input type="email" name="email" id="email" />
                    </div>
                    <div className='child-div'>
                    <label htmlFor="">password :</label>
                    <input type="password"  name="password" id="password" />
                    </div>
                    <div className='child-div'>
                    <input type="file" style={{ display: "none" }} name="photoURL" id="photoURL" />
                        <label htmlFor="photoURL">
                            <img  width="28px" height="28px" src={Add} alt="" />
                            <span>Add an avatar</span>
                        </label>
                    </div>
                    
                    <input type="submit" value="Submit" className='button'/>
                </form>
                <p>Already have an account ?<span onClick={() => navigate("/login")} className='links'>Login</span></p>
            </div>


        </div>
    )
}

export default Register

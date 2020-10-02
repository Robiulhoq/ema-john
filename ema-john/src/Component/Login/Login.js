import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig)

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setuser] = useState({
    inSingIn: false,
    email: '',
    password: '',
    photo: '', 
    name: '',

  });

const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
const { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  var FbProvider = new firebase.auth.FacebookAuthProvider();
  const hendleSingIn = () =>{
    firebase.auth().signInWithPopup(provider)
     .then(res => {
       const {displayName, photoURL, email} = res.user;
       const singIN = {
         inSingIn: true,
         name: displayName,
         email: email,
         photo: photoURL,
         
       }
      setuser(singIN);
       console.log(displayName, photoURL, email);
     })
  }

const hendleSingOut = () =>{
  firebase.auth().signOut()
  .then(res => {
    const signedoutuser = {
      inSingIn: false,
      name: '',
      email: '',
      photo: '',
      error: '',
      success: false,
    }
    setuser(signedoutuser);
  })
}
const hendleblur =(event) =>{
  let isFromValid = true;
    if(event.target.name === 'email'){
       isFromValid = /\S+@\S+\.\S+/.test(event.target.value);
      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(event.target.value);
      isFromValid = isPasswordValid && passwordNumber;
    }
    if (isFromValid){
     const newUserInfo = {...user};
     newUserInfo[event.target.name] = event.target.value;
     setuser(newUserInfo);
    }
} 
const hendleSubmit = (e) => {
  // console.log(user.email, user.password)
   if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
     const newUserInfo ={...user};
      newUserInfo.error ='';
      newUserInfo.success= true;
      setuser(newUserInfo); 
      updetedUserName(user.name)
      
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      // ...
      setuser(newUserInfo)
    });
   }
   if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo ={...user};
      newUserInfo.error ='';
      newUserInfo.success= true;
      setuser(newUserInfo); 
      setLoggedInUser(newUserInfo);
      history.replace(from);
      console.log('sing in user info', res.user)
    })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
    });
   }

   e.preventDefault();
}
const updetedUserName = name => {
  var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      }).then(function() {
        console.log('user name updeted sussess')
      }).catch(function(error) {
        console.log(error)
      });
      }


      const hendleFbsingin = () =>{
              firebase.auth().signInWithPopup(FbProvider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
  
});
      }

  return (  
    <div className="App">
     {user.inSingIn?
        <button onClick={hendleSingOut}>Sign out</button>:
        <button onClick={hendleSingIn}>Sign in</button>
     }
     <button onClick={hendleFbsingin} >Loging Fb</button>
      {
        user.inSingIn && <div>
                <p> Welcome, {user.name} </p> 
                <p>Email: {user.email}</p>
                <img src={user.photo} alt=""></img>
                        </div>
              }
          <form action="">
                <h2>Welcome to our website</h2>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
                <label htmlFor="newUser">New User Sing up</label>
                <br/>
                { newUser &&  <input name="name" onBlur={hendleblur} placeholder="Enter your name" type="text"/>}
                <br/>
                <input placeholder="Enter your email" name="email" onBlur={hendleblur} required type="text"/> 
                <br/>
                <input placeholder="Enter your password" name="password" onBlur={hendleblur} required type="password"  id=""/>
                <br/>
                <input type="submit" onClick={hendleSubmit} value={newUser? 'Sing Up' : 'Sing in'}/>
          </form>
            <p style={{color:'red'}}>{user.error}</p>
            {
              user.success && <p style={{color:'green'}}>{newUser? "you are created account sucessfully" : "you logged in successfully"}</p>
            }
    </div>
  );
}

export default Login;

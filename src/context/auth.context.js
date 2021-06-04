import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";

export const AuthContext = React.createContext();

const firebaseConfig = {
  apiKey: "AIzaSyBIqDbLdKk-wTaEQab2z2uR7vhqzt8DR2Y",
  authDomain: "japanese-ez.firebaseapp.com",
  databaseURL: "https://japanese-ez-default-rtdb.firebaseio.com",
  projectId: "japanese-ez",
  storageBucket: "japanese-ez.appspot.com",
  messagingSenderId: "963092865120",
  appId: "1:963092865120:web:af4ba0521656c2b8d3a305",
  measurementId: "G-M059303EKM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      signInWithGoogle: this.signInWithGoogle,
      logout: this.logout,
      getCurrentUser: this.getCurrentUser,
    };
  }

  signInWithGoogle = () => {
    const user = firebase.auth().signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        
        console.log(token);
        console.log(user);
        console.log(credential);
        console.log(firebase.auth().currentUser);
        return user;
      }).catch((error) => {
        return null
      });
    this.setState({ user });
  }

  logout = async () => {
    await firebase.auth().signOut();
  }

  getCurrentUser = () => {
    return firebase.auth().currentUser;
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
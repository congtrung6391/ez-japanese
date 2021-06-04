import React from 'react';
import { Button, Container } from 'react-bootstrap';
// import firebase from "firebase/app";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBIqDbLdKk-wTaEQab2z2uR7vhqzt8DR2Y",
//   authDomain: "japanese-ez.firebaseapp.com",
//   databaseURL: "https://japanese-ez-default-rtdb.firebaseio.com",
//   projectId: "japanese-ez",
//   storageBucket: "japanese-ez.appspot.com",
//   messagingSenderId: "963092865120",
//   appId: "1:963092865120:web:af4ba0521656c2b8d3a305",
//   measurementId: "G-M059303EKM"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const Login = () => {
  return (
    <Container>
      <Button>Login with Google</Button>
    </Container>
  );
};

export default Login;

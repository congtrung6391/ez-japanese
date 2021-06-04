import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { AuthContext } from '../../context/auth.context';

const Login = () => {
  const authContext = useContext(AuthContext);

  return (
    <Container>
      <Button onClick={authContext.signInWithGoogle}>Login with Google</Button>
    </Container>
  );
};

export default Login;

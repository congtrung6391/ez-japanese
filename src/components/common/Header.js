import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {

  return (
    <Navbar
      style={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderBottom: '1px solid #ced4da',
        marginBottom: '1rem',
      }}
    >
      <Container>
        <Navbar.Brand href="/">
          <h3 style={{ fontFamily: '\'Satisfy\', cursive', marginBottom: '0' }}>Let's be depressed together</h3>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/character">Character</Nav.Link>
          <Nav.Link href="/newword">NewWord</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

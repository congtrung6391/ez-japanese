import React from 'react';

const Footer = () => (
  <div
    style={{
      width: '100%',
      height: '3.25rem',
      color: 'rgba(0,0,0,.5)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      position: 'absolute',
      bottom: '-3.25rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ margin: '0' }}>
      Creater by
      {' '}
      <a href="https://github.com/congtrung6391"><strong>AustinTr</strong></a>
    </p>
  </div>
);

export default Footer;
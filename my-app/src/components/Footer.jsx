import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Контактная информация:</p>
        <p>Email: contact@myproject.com</p>
        <p>Телефон: +блабла 456 7890</p>
        <div className="batman-animation">
          <img src="../images/batman.png" alt="Бэтмен" className="batman" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

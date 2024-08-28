// Footer.js
import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>BookSea</h2>
          <p>Discover your next favorite book!</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="https://www.amazon.in/">Amazon</a></li>
            <li><a href="https://www.flipkart.com/">Flipcart</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@booksea.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BookSea. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

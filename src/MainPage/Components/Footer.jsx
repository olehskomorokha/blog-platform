import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-section">
            <h1>blog-platform</h1>
            <p>Ваш помічник у навчанні та спілкуванні.</p>
          </div>
          <div className="footer-section">
            <h3>Корисні посилання</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Про нас</Link>
              </li>
              <li>
                <Link to="/" className="footer-link">Контакти</Link>
              </li>
              <li>
                <Link to="/" className="footer-link">Допомога</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section social-links">
            <h6>Ми в соціальних мережах</h6>
            <Link to="/" className="social-link"><FaFacebookF size={20} /></Link>
            <Link to="/" className="social-link"><FaTwitter size={20} /></Link>
            <Link to="/" className="social-link"><FaInstagram size={20} /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <small>&copy; {new Date().getFullYear()} blog-platform. Всі права захищено.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer no-print">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/eligibility">Check Eligibility</Link></li>
              <li><Link to="/plans">Compare Plans</Link></li>
              <li><Link to="/providers">Find Providers</Link></li>
              <li><Link to="/login">Member Portal</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/faq">Frequently Asked Questions</Link></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#accessibility">Accessibility</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Information</h3>
            <ul className="contact-list">
              <li>
                <strong>Phone:</strong> 1-800-555-HEALTH (4325)
              </li>
              <li>
                <strong>TTY:</strong> 1-800-555-4326
              </li>
              <li>
                <strong>Hours:</strong> Monday-Friday, 8AM-6PM
              </li>
              <li>
                <strong>Email:</strong> info@dhspublicinsurance.gov
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Emergency Services</h3>
            <p>
              If you have a medical emergency, call <strong>911</strong> immediately.
            </p>
            <p className="footer-note">
              For urgent but non-emergency care, contact your provider or visit an urgent care center.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Department of Health Services. All rights reserved.</p>
          <p className="footer-disclaimer">
            This is a demonstration website for educational purposes. Not affiliated with any government agency.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

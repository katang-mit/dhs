import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to the Public Insurance Platform</h1>
          <p className="hero-subtitle">
            Affordable, comprehensive health coverage for you and your family.
            Check your eligibility, compare plans, and enroll today.
          </p>
          <div className="hero-actions">
            <Link to="/eligibility" className="btn btn-primary btn-large">
              Check Eligibility
            </Link>
            <Link to="/plans" className="btn btn-secondary btn-large">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#e6f2ff"/>
                  <path d="M24 14L34 20V32L24 38L14 32V20L24 14Z" stroke="#0066cc" strokeWidth="2" fill="none"/>
                  <path d="M20 26L23 29L28 24" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Check Your Eligibility</h3>
              <p>
                Answer a few simple questions to instantly find out which health insurance
                programs you qualify for based on your household size, income, and circumstances.
              </p>
              <Link to="/eligibility" className="feature-link">
                Get Started →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#e8f5e9"/>
                  <path d="M16 20h16M16 24h16M16 28h12" stroke="#2d7a3e" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="14" y="16" width="20" height="18" rx="2" stroke="#2d7a3e" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Compare Health Plans</h3>
              <p>
                Explore different coverage options side-by-side. Compare monthly costs,
                benefits, provider networks, and find the plan that best fits your needs.
              </p>
              <Link to="/plans" className="feature-link">
                Compare Plans →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#fff3e0"/>
                  <circle cx="24" cy="20" r="4" stroke="#f57c00" strokeWidth="2" fill="none"/>
                  <path d="M24 26c-6 0-10 4-10 8h20c0-4-4-8-10-8z" stroke="#f57c00" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3>Find Healthcare Providers</h3>
              <p>
                Search our extensive network of doctors, hospitals, specialists, and pharmacies.
                Filter by location, specialty, language, and more to find the right provider.
              </p>
              <Link to="/providers" className="feature-link">
                Find Providers →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#f3e5f5"/>
                  <rect x="16" y="18" width="16" height="14" rx="2" stroke="#7b1fa2" strokeWidth="2" fill="none"/>
                  <path d="M20 18v-2a4 4 0 018 0v2" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="25" r="2" fill="#7b1fa2"/>
                </svg>
              </div>
              <h3>Member Portal</h3>
              <p>
                Access your digital insurance card, view coverage documents, download tax forms,
                and manage your health insurance account all in one secure place.
              </p>
              <Link to="/login" className="feature-link">
                Sign In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <h2>Who Can Get Coverage?</h2>
          <div className="info-grid">
            <div className="info-item">
              <h4>Individuals & Families</h4>
              <p>Coverage for adults, children, and entire families based on household income.</p>
            </div>
            <div className="info-item">
              <h4>Pregnant Women</h4>
              <p>Special coverage for expectant mothers with comprehensive prenatal and maternity care.</p>
            </div>
            <div className="info-item">
              <h4>Children & Students</h4>
              <p>Free or low-cost coverage for children up to age 19 and full-time students.</p>
            </div>
            <div className="info-item">
              <h4>People with Disabilities</h4>
              <p>Comprehensive coverage with specialized services and support for individuals with disabilities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Find out if you qualify for free or low-cost health insurance in less than 5 minutes.
            </p>
            <Link to="/eligibility" className="btn btn-success btn-large">
              Check Your Eligibility Now
            </Link>
          </div>
        </div>
      </section>

      <section className="help-section">
        <div className="container">
          <h2>Need Help?</h2>
          <div className="help-grid">
            <div className="help-card">
              <h4>📞 Call Us</h4>
              <p><strong>1-800-555-HEALTH (4325)</strong></p>
              <p>Monday-Friday, 8AM-6PM</p>
              <p>TTY: 1-800-555-4326</p>
            </div>
            <div className="help-card">
              <h4>💬 Live Chat</h4>
              <p>Chat with a representative</p>
              <p>Available during business hours</p>
              <button className="btn btn-secondary">Start Chat</button>
            </div>
            <div className="help-card">
              <h4>📧 Email Support</h4>
              <p>Send us your questions</p>
              <p>info@dhspublicinsurance.gov</p>
              <p>Response within 24-48 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

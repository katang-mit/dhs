import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
    navigate('/')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-logo">
              <Link to="/">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#0066cc"/>
                  <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" fill="white"/>
                  <path d="M20 15L24 17.5V22.5L20 25L16 22.5V17.5L20 15Z" fill="#0066cc"/>
                </svg>
                <div className="header-title">
                  <span className="header-dept">Department of Health Services</span>
                  <span className="header-subtitle">Public Insurance Platform</span>
                </div>
              </Link>
            </div>
            <div className="header-actions">
              <button
                className="btn-language no-print"
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
              >
                {language === 'en' ? 'Español' : 'English'}
              </button>
              {isLoggedIn && (
                <button
                  className="btn-logout no-print"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className="header-nav no-print">
        <div className="container">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/eligibility" onClick={() => setMobileMenuOpen(false)}>Check Eligibility</Link></li>
            <li><Link to="/plans" onClick={() => setMobileMenuOpen(false)}>Compare Plans</Link></li>
            <li><Link to="/providers" onClick={() => setMobileMenuOpen(false)}>Find Providers</Link></li>
            <li><Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link></li>
            <li>
              <Link to={isLoggedIn ? "/member/documents" : "/login"} onClick={() => setMobileMenuOpen(false)}>
                Member Portal
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header

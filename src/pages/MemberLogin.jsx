import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './MemberLogin.css'

function MemberLogin() {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AppContext)

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate login - accepts any credentials for demo
    setIsLoading(true)
    setTimeout(() => {
      setIsLoggedIn(true)
      navigate('/member/documents')
    }, 1000)
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-info">
            <h1>Member Portal</h1>
            <p className="login-subtitle">
              Access your health insurance documents, view your coverage, and manage your account.
            </p>

            <div className="login-features">
              <h3>What you can do:</h3>
              <ul>
                <li>✓ View and download your digital insurance card</li>
                <li>✓ Access coverage documents and policy details</li>
                <li>✓ Download tax forms (1095-B)</li>
                <li>✓ View Explanation of Benefits (EOB)</li>
                <li>✓ Access educational resources</li>
                <li>✓ Manage your profile and preferences</li>
              </ul>
            </div>

            <div className="demo-notice">
              <h4>Demo Notice</h4>
              <p>
                This is a demonstration portal. For demo purposes, you can log in with any username and password combination.
              </p>
            </div>
          </div>

          <div className="login-form-container">
            <div className="card">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your member portal</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                  {errors.username && <div className="form-error">{errors.username}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  {errors.password && <div className="form-error">{errors.password}</div>}
                </div>

                <div className="form-options">
                  <label className="checkbox-item">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="forgot-link">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-large"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="login-divider">
                <span>or</span>
              </div>

              <div className="login-alternatives">
                <button className="btn btn-secondary btn-block">
                  Create New Account
                </button>
                <button className="btn btn-secondary btn-block">
                  Continue as Guest
                </button>
              </div>
            </div>

            <div className="login-help">
              <h4>Need Help?</h4>
              <p>Having trouble signing in?</p>
              <div className="help-links">
                <a href="#support">Contact Support</a>
                <a href="#faq">View FAQ</a>
                <a href="#accessibility">Accessibility Options</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberLogin

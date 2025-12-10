import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './EligibilityResults.css'

function EligibilityResults() {
  const { eligibilityData } = useContext(AppContext)
  const navigate = useNavigate()

  if (!eligibilityData) {
    return (
      <div className="results-page">
        <div className="container-narrow">
          <div className="alert alert-warning">
            <h3>No Eligibility Data Found</h3>
            <p>Please complete the eligibility questionnaire first.</p>
            <Link to="/eligibility" className="btn btn-primary">
              Start Eligibility Check
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const { qualifiedPrograms, incomePercentFPL, householdSize, formData } = eligibilityData

  return (
    <div className="results-page">
      <div className="container-narrow">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/eligibility">Eligibility Check</Link>
          <span>/</span>
          <span>Results</span>
        </div>

        <div className="results-header">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#2d7a3e"/>
              <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Great News! You May Qualify for Coverage</h1>
          <p className="results-subtitle">
            Based on your household size of {householdSize} and income information,
            you may be eligible for the following health insurance programs:
          </p>
        </div>

        <div className="income-summary card">
          <h3>Your Income Summary</h3>
          <div className="income-details">
            <div className="income-item">
              <span className="income-label">Household Size:</span>
              <span className="income-value">{householdSize} {householdSize === 1 ? 'person' : 'people'}</span>
            </div>
            <div className="income-item">
              <span className="income-label">Annual Income:</span>
              <span className="income-value">${parseFloat(formData.annualIncome).toLocaleString()}</span>
            </div>
            <div className="income-item">
              <span className="income-label">Percent of Federal Poverty Level:</span>
              <span className="income-value">{incomePercentFPL}%</span>
            </div>
          </div>
        </div>

        <div className="programs-section">
          <h2>Your Qualified Programs</h2>
          {qualifiedPrograms.map((program, index) => (
            <div key={index} className="program-card">
              <div className="program-header">
                <div>
                  <h3>{program.name}</h3>
                  <span className="program-type badge">{program.type}</span>
                </div>
                <div className="program-premium">
                  {program.premium === 0 ? (
                    <span className="premium-free">FREE</span>
                  ) : (
                    <>
                      <span className="premium-amount">${program.premium}</span>
                      <span className="premium-period">/month</span>
                    </>
                  )}
                </div>
              </div>
              <p className="program-description">{program.description}</p>
              <div className="program-coverage">
                <h4>Coverage Includes:</h4>
                <p>{program.coverage}</p>
              </div>
            </div>
          ))}
        </div>

        {qualifiedPrograms.length === 0 && (
          <div className="alert alert-info">
            <h3>Standard Marketplace Plans Available</h3>
            <p>
              While you may not qualify for subsidized programs based on income,
              you can still purchase health insurance through the marketplace.
            </p>
            <p>
              You may also want to check if you're eligible for coverage through an employer
              or family member's plan.
            </p>
          </div>
        )}

        <div className="next-steps card">
          <h3>Next Steps</h3>
          <ol className="steps-list">
            <li>
              <strong>Compare Plans:</strong> Review detailed plan options to find the coverage that best fits your needs.
            </li>
            <li>
              <strong>Find Providers:</strong> Search for doctors and hospitals in your area that accept these plans.
            </li>
            <li>
              <strong>Apply for Coverage:</strong> Complete your enrollment application to get covered.
            </li>
          </ol>

          <div className="action-buttons">
            <Link to="/plans" className="btn btn-primary btn-large">
              Compare Plans
            </Link>
            <Link to="/enrollment" className="btn btn-success btn-large">
              Start Enrollment
            </Link>
          </div>

          <div className="secondary-actions">
            <Link to="/providers">Find Providers</Link>
            <Link to="/eligibility">Check Eligibility Again</Link>
          </div>
        </div>

        <div className="help-section card">
          <h3>Need Help Understanding Your Results?</h3>
          <p>
            Our trained representatives can help you understand your options and guide you through the enrollment process.
          </p>
          <div className="help-options">
            <div className="help-option">
              <strong>📞 Call Us</strong>
              <p>1-800-555-HEALTH (4325)</p>
              <p className="help-hours">Mon-Fri, 8AM-6PM</p>
            </div>
            <div className="help-option">
              <strong>💬 Live Chat</strong>
              <p>Chat with a representative</p>
              <button className="btn btn-secondary">Start Chat</button>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <p>
            <strong>Important:</strong> This is a preliminary eligibility determination based on the information you provided.
            Final eligibility will be confirmed during the application process. Your actual premium may vary based on
            the specific plan you select and final income verification.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EligibilityResults

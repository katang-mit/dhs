import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { insurancePlans } from '../data/plans'
import { AppContext } from '../context/AppContext'
import './PlanComparison.css'

function PlanComparison() {
  const { setSelectedPlan } = useContext(AppContext)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState([])

  const toggleCompare = (planId) => {
    if (selectedForCompare.includes(planId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== planId))
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, planId])
    }
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  const getComparisonPlans = () => {
    return insurancePlans.filter(plan => selectedForCompare.includes(plan.id))
  }

  return (
    <div className="plans-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Compare Plans</span>
        </div>

        <div className="page-header">
          <h1>Compare Health Insurance Plans</h1>
          <p>Find the right coverage for you and your family</p>
        </div>

        <div className="compare-controls">
          <button
            className={`btn ${compareMode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCompareMode(!compareMode)}
          >
            {compareMode ? `Compare Selected (${selectedForCompare.length})` : 'Compare Plans Side-by-Side'}
          </button>
          {compareMode && selectedForCompare.length > 0 && (
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedForCompare([])}
            >
              Clear Selection
            </button>
          )}
        </div>

        {!compareMode || selectedForCompare.length === 0 ? (
          <div className="plans-grid">
            {insurancePlans.map(plan => (
              <div key={plan.id} className="plan-card">
                {compareMode && (
                  <div className="compare-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedForCompare.includes(plan.id)}
                        onChange={() => toggleCompare(plan.id)}
                        disabled={!selectedForCompare.includes(plan.id) && selectedForCompare.length >= 3}
                      />
                      <span>Compare</span>
                    </label>
                  </div>
                )}

                <div className="plan-tier">
                  <span className={`tier-badge tier-${plan.tier.toLowerCase()}`}>{plan.tier}</span>
                  <span className="plan-type">{plan.type}</span>
                </div>

                <h2>{plan.name}</h2>

                <div className="plan-premium">
                  {plan.premium === 0 ? (
                    <div className="premium-free">FREE</div>
                  ) : (
                    <>
                      <span className="premium-amount">${plan.premium}</span>
                      <span className="premium-period">/month</span>
                    </>
                  )}
                </div>

                <div className="plan-basics">
                  <div className="basic-item">
                    <span className="basic-label">Deductible</span>
                    <span className="basic-value">${plan.deductible.toLocaleString()}</span>
                  </div>
                  <div className="basic-item">
                    <span className="basic-label">Out-of-Pocket Max</span>
                    <span className="basic-value">${plan.outOfPocketMax.toLocaleString()}</span>
                  </div>
                  <div className="basic-item">
                    <span className="basic-label">Network</span>
                    <span className="basic-value">{plan.networkSize}</span>
                  </div>
                </div>

                <div className="plan-highlights">
                  <h4>Key Benefits</h4>
                  <ul>
                    {plan.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="plan-actions">
                  <Link
                    to="/enrollment"
                    className="btn btn-primary btn-block"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Select This Plan
                  </Link>
                  <button
                    className="btn-link"
                    onClick={() => {
                      document.getElementById(`plan-details-${plan.id}`).scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-column">Feature</th>
                  {getComparisonPlans().map(plan => (
                    <th key={plan.id}>
                      <div className="compare-plan-header">
                        <span className={`tier-badge tier-${plan.tier.toLowerCase()}`}>{plan.tier}</span>
                        <h3>{plan.name}</h3>
                        <div className="compare-premium">
                          {plan.premium === 0 ? 'FREE' : `$${plan.premium}/mo`}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Monthly Premium</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.premium === 0 ? 'FREE' : `$${plan.premium}`}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Annual Deductible</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>${plan.deductible.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Out-of-Pocket Maximum</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>${plan.outOfPocketMax.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Primary Care Visit</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.benefits.primaryCare}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Specialist Visit</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.benefits.specialist}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Emergency Care</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.benefits.emergency}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Generic Prescriptions</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.benefits.prescriptions.generic}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Dental Coverage</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.benefits.dental}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Vision Coverage</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.benefits.vision}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name">Provider Network</td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>{plan.networkSize}</td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-name"></td>
                  {getComparisonPlans().map(plan => (
                    <td key={plan.id}>
                      <Link
                        to="/enrollment"
                        className="btn btn-primary btn-block"
                        onClick={() => handleSelectPlan(plan)}
                      >
                        Select Plan
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="plans-details-section">
          <h2>Detailed Plan Information</h2>
          {insurancePlans.map(plan => (
            <div key={plan.id} id={`plan-details-${plan.id}`} className="plan-detail-card">
              <div className="detail-header">
                <div>
                  <span className={`tier-badge tier-${plan.tier.toLowerCase()}`}>{plan.tier}</span>
                  <h3>{plan.name}</h3>
                  <p className="plan-eligibility">{plan.eligibility}</p>
                </div>
                <div className="detail-premium">
                  {plan.premium === 0 ? (
                    <span className="premium-free">FREE</span>
                  ) : (
                    <>
                      <span className="premium-amount">${plan.premium}</span>
                      <span className="premium-period">/month</span>
                    </>
                  )}
                </div>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <h4>Coverage Overview</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Coverage Level:</strong> {plan.coverageLevel}
                    </div>
                    <div className="detail-item">
                      <strong>Plan Type:</strong> {plan.type}
                    </div>
                    <div className="detail-item">
                      <strong>Annual Deductible:</strong> ${plan.deductible.toLocaleString()}
                    </div>
                    <div className="detail-item">
                      <strong>Out-of-Pocket Max:</strong> ${plan.outOfPocketMax.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Medical Services</h4>
                  <div className="benefits-list">
                    <div className="benefit-row">
                      <span>Preventive Care:</span>
                      <strong>{plan.benefits.preventiveCare}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Primary Care Visits:</span>
                      <strong>{plan.benefits.primaryCare}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Specialist Visits:</span>
                      <strong>{plan.benefits.specialist}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Urgent Care:</span>
                      <strong>{plan.benefits.urgentCare}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Emergency Room:</span>
                      <strong>{plan.benefits.emergency}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Hospital Stay:</span>
                      <strong>{plan.benefits.hospitalStay}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Mental Health:</span>
                      <strong>{plan.benefits.mentalHealth}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Maternity Care:</span>
                      <strong>{plan.benefits.maternity}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Prescription Drugs</h4>
                  <div className="benefits-list">
                    <div className="benefit-row">
                      <span>Generic:</span>
                      <strong>{plan.benefits.prescriptions.generic}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Brand Name:</span>
                      <strong>{plan.benefits.prescriptions.brandName}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Specialty:</span>
                      <strong>{plan.benefits.prescriptions.specialty}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Additional Benefits</h4>
                  <div className="benefits-list">
                    <div className="benefit-row">
                      <span>Dental:</span>
                      <strong>{plan.benefits.dental}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Vision:</span>
                      <strong>{plan.benefits.vision}</strong>
                    </div>
                    <div className="benefit-row">
                      <span>Network Size:</span>
                      <strong>{plan.networkSize}</strong>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Plan Features</h4>
                  <ul className="features-list">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="detail-section">
                    <h4>Plan Limitations</h4>
                    <ul className="limitations-list">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx}>• {limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="detail-actions">
                <Link
                  to="/enrollment"
                  className="btn btn-primary btn-large"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Enroll in {plan.name}
                </Link>
                <Link to="/providers" className="btn btn-secondary btn-large">
                  Find Providers
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlanComparison

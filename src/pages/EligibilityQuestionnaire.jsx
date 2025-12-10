import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './EligibilityQuestionnaire.css'

function EligibilityQuestionnaire() {
  const navigate = useNavigate()
  const { setEligibilityData } = useContext(AppContext)

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    householdSize: '',
    zipCode: '',
    householdMembers: [],
    annualIncome: '',
    employmentStatus: '',
    isPregnant: false,
    hasDisability: false,
    isFosterCare: false,
    isStudent: false,
    needsCoverage: 'self'
  })

  const totalSteps = 5

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleMemberAgeChange = (index, age) => {
    const newMembers = [...formData.householdMembers]
    newMembers[index] = parseInt(age) || 0
    setFormData(prev => ({ ...prev, householdMembers: newMembers }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.householdSize || formData.householdSize < 1) {
        newErrors.householdSize = 'Please enter a valid household size'
      }
      if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid 5-digit ZIP code'
      }
    }

    if (step === 2) {
      const size = parseInt(formData.householdSize)
      if (formData.householdMembers.length !== size) {
        newErrors.householdMembers = 'Please enter ages for all household members'
      }
    }

    if (step === 3) {
      if (!formData.annualIncome) {
        newErrors.annualIncome = 'Please enter your annual household income'
      } else if (parseFloat(formData.annualIncome) < 0) {
        newErrors.annualIncome = 'Income cannot be negative'
      }
    }

    if (step === 4) {
      if (!formData.employmentStatus) {
        newErrors.employmentStatus = 'Please select your employment status'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) {
        // Initialize household members array
        const size = parseInt(formData.householdSize)
        if (formData.householdMembers.length !== size) {
          setFormData(prev => ({
            ...prev,
            householdMembers: Array(size).fill(0)
          }))
        }
      }
      setCurrentStep(prev => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      // Calculate eligibility
      const income = parseFloat(formData.annualIncome)
      const householdSize = parseInt(formData.householdSize)
      const ages = formData.householdMembers

      // Federal Poverty Level calculation (approximate)
      const fpl = 14580 + (5140 * (householdSize - 1))
      const incomePercentFPL = (income / fpl) * 100

      const qualifiedPrograms = []

      // HealthFirst Basic (Medicaid) - up to 138% FPL
      if (incomePercentFPL <= 138) {
        qualifiedPrograms.push({
          name: 'HealthFirst Basic',
          type: 'Medicaid',
          premium: 0,
          description: 'Comprehensive coverage with no monthly premium',
          coverage: 'Full coverage including preventive care, doctor visits, hospital stays, prescriptions, mental health services, and more'
        })
      }

      // CareShield Plus - 138-200% FPL
      if (incomePercentFPL > 138 && incomePercentFPL <= 200) {
        qualifiedPrograms.push({
          name: 'CareShield Plus',
          type: 'Subsidized Marketplace',
          premium: 50,
          description: 'Affordable coverage with low monthly premium',
          coverage: 'Comprehensive coverage with subsidized premiums and cost-sharing reductions'
        })
      }

      // WellCare Enhanced - 200-300% FPL
      if (incomePercentFPL > 200 && incomePercentFPL <= 300) {
        qualifiedPrograms.push({
          name: 'WellCare Enhanced',
          type: 'Subsidized Marketplace',
          premium: 150,
          description: 'Quality coverage with moderate subsidies',
          coverage: 'Comprehensive coverage with partial premium subsidies'
        })
      }

      // Children's coverage (CHIP) - for children under 19
      const hasChildren = ages.some(age => age < 19)
      if (hasChildren && incomePercentFPL <= 250) {
        qualifiedPrograms.push({
          name: 'Children\'s Health Insurance Program (CHIP)',
          type: 'CHIP',
          premium: 0,
          description: 'Free or low-cost coverage for children',
          coverage: 'Comprehensive coverage for children up to age 19 including dental and vision'
        })
      }

      // Pregnancy coverage
      if (formData.isPregnant && incomePercentFPL <= 200) {
        qualifiedPrograms.push({
          name: 'Maternal Care Program',
          type: 'Pregnancy Medicaid',
          premium: 0,
          description: 'Comprehensive prenatal and maternity coverage',
          coverage: 'Full prenatal care, delivery, postpartum care, and newborn coverage'
        })
      }

      // If no specific programs, offer standard marketplace
      if (qualifiedPrograms.length === 0 || incomePercentFPL > 138) {
        qualifiedPrograms.push({
          name: 'Marketplace Plans',
          type: 'Marketplace',
          premium: 250,
          description: 'Standard marketplace health insurance plans',
          coverage: 'Choose from various plan tiers with different coverage levels'
        })
      }

      const eligibilityResult = {
        formData,
        income,
        householdSize,
        fpl,
        incomePercentFPL: Math.round(incomePercentFPL),
        qualifiedPrograms,
        timestamp: new Date().toISOString()
      }

      setEligibilityData(eligibilityResult)
      navigate('/eligibility/results')
    }
  }

  const renderProgressBar = () => (
    <div className="progress-bar">
      <div className="progress-steps">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`progress-step ${i + 1 <= currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'completed' : ''}`}
          >
            <div className="step-circle">{i + 1}</div>
            <div className="step-label">Step {i + 1}</div>
          </div>
        ))}
      </div>
      <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
    </div>
  )

  return (
    <div className="eligibility-page">
      <div className="container-narrow">
        <div className="page-header">
          <h1>Check Your Eligibility</h1>
          <p>Answer a few questions to see which health insurance programs you qualify for.</p>
        </div>

        {renderProgressBar()}

        <div className="card">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Household Information</h2>
                <p className="step-description">Tell us about your household size and location.</p>

                <div className="form-group">
                  <label htmlFor="householdSize" className="form-label">
                    How many people live in your household?
                    <span className="tooltip" data-tooltip="Include yourself, spouse, and dependents">ℹ️</span>
                  </label>
                  <input
                    type="number"
                    id="householdSize"
                    name="householdSize"
                    className="form-input"
                    value={formData.householdSize}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                  />
                  {errors.householdSize && <div className="form-error">{errors.householdSize}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode" className="form-label">
                    What is your ZIP code?
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="form-input"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    maxLength="5"
                    placeholder="12345"
                  />
                  {errors.zipCode && <div className="form-error">{errors.zipCode}</div>}
                  <div className="form-help">Available programs may vary by location</div>
                </div>

                <div className="form-group">
                  <label className="form-label">Who needs coverage?</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="needsCoverage"
                        value="self"
                        checked={formData.needsCoverage === 'self'}
                        onChange={handleInputChange}
                      />
                      <span>Just me</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="needsCoverage"
                        value="family"
                        checked={formData.needsCoverage === 'family'}
                        onChange={handleInputChange}
                      />
                      <span>Me and my family</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="needsCoverage"
                        value="family-only"
                        checked={formData.needsCoverage === 'family-only'}
                        onChange={handleInputChange}
                      />
                      <span>Just my family members</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h2>Household Member Ages</h2>
                <p className="step-description">
                  Please enter the age of each person in your household (including yourself).
                </p>

                <div className="household-members">
                  {formData.householdMembers.map((age, index) => (
                    <div key={index} className="form-group">
                      <label htmlFor={`member-${index}`} className="form-label">
                        Member {index + 1} Age
                      </label>
                      <input
                        type="number"
                        id={`member-${index}`}
                        className="form-input"
                        value={age || ''}
                        onChange={(e) => handleMemberAgeChange(index, e.target.value)}
                        min="0"
                        max="120"
                        placeholder="Age"
                      />
                    </div>
                  ))}
                </div>
                {errors.householdMembers && <div className="form-error">{errors.householdMembers}</div>}
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h2>Income Information</h2>
                <p className="step-description">
                  Tell us about your household's annual income to determine your eligibility.
                </p>

                <div className="form-group">
                  <label htmlFor="annualIncome" className="form-label">
                    What is your total annual household income?
                    <span className="tooltip" data-tooltip="Include all sources: wages, self-employment, Social Security, etc.">ℹ️</span>
                  </label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">$</span>
                    <input
                      type="number"
                      id="annualIncome"
                      name="annualIncome"
                      className="form-input with-prefix"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      min="0"
                      step="100"
                      placeholder="35000"
                    />
                  </div>
                  {errors.annualIncome && <div className="form-error">{errors.annualIncome}</div>}
                  <div className="form-help">Enter your best estimate of total household income before taxes</div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content">
                <h2>Employment Status</h2>
                <p className="step-description">Select your current employment situation.</p>

                <div className="form-group">
                  <label className="form-label">What is your employment status?</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="employed-full-time"
                        checked={formData.employmentStatus === 'employed-full-time'}
                        onChange={handleInputChange}
                      />
                      <span>Employed full-time</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="employed-part-time"
                        checked={formData.employmentStatus === 'employed-part-time'}
                        onChange={handleInputChange}
                      />
                      <span>Employed part-time</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="self-employed"
                        checked={formData.employmentStatus === 'self-employed'}
                        onChange={handleInputChange}
                      />
                      <span>Self-employed</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="unemployed"
                        checked={formData.employmentStatus === 'unemployed'}
                        onChange={handleInputChange}
                      />
                      <span>Unemployed</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="retired"
                        checked={formData.employmentStatus === 'retired'}
                        onChange={handleInputChange}
                      />
                      <span>Retired</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="student"
                        checked={formData.employmentStatus === 'student'}
                        onChange={handleInputChange}
                      />
                      <span>Student</span>
                    </label>
                  </div>
                  {errors.employmentStatus && <div className="form-error">{errors.employmentStatus}</div>}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="step-content">
                <h2>Special Circumstances</h2>
                <p className="step-description">
                  Check all that apply. These may qualify you for additional programs or benefits.
                </p>

                <div className="form-group">
                  <div className="checkbox-group">
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        name="isPregnant"
                        checked={formData.isPregnant}
                        onChange={handleInputChange}
                      />
                      <span>Someone in the household is pregnant</span>
                    </label>
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        name="hasDisability"
                        checked={formData.hasDisability}
                        onChange={handleInputChange}
                      />
                      <span>Someone in the household has a disability</span>
                    </label>
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        name="isFosterCare"
                        checked={formData.isFosterCare}
                        onChange={handleInputChange}
                      />
                      <span>Someone in the household was in foster care at age 18 or older</span>
                    </label>
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        name="isStudent"
                        checked={formData.isStudent}
                        onChange={handleInputChange}
                      />
                      <span>Full-time student (under age 26)</span>
                    </label>
                  </div>
                </div>

                <div className="alert alert-info">
                  <strong>Almost done!</strong> Click "See My Results" to find out which programs you qualify for.
                </div>
              </div>
            )}

            <div className="form-actions">
              {currentStep > 1 && (
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                  ← Back
                </button>
              )}
              {currentStep < totalSteps ? (
                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  See My Results
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="help-box">
          <h4>Need Help?</h4>
          <p>Call us at <strong>1-800-555-HEALTH</strong> for assistance with this form.</p>
        </div>
      </div>
    </div>
  )
}

export default EligibilityQuestionnaire

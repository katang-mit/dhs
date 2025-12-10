import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './EnrollmentApplication.css'

function EnrollmentApplication() {
  const navigate = useNavigate()
  const { selectedPlan, setEnrollmentData } = useContext(AppContext)

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [signature, setSignature] = useState('')

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    gender: '',
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Household Information
    householdMembers: [],
    // Documents (file names)
    proofOfIncome: null,
    proofOfIdentity: null,
    proofOfResidence: null,
  })

  const totalSteps = 4

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileUpload = (docType, e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [docType]: file.name }))
      setFormData(prev => ({ ...prev, [docType]: file.name }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.ssn || !/^\d{3}-?\d{2}-?\d{4}$/.test(formData.ssn)) {
        newErrors.ssn = 'Valid SSN required (XXX-XX-XXXX)'
      }
      if (!formData.gender) newErrors.gender = 'Gender is required'
    }

    if (step === 2) {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required'
      }
      if (!formData.phone || !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
        newErrors.phone = 'Valid phone number required'
      }
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.state) newErrors.state = 'State is required'
      if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Valid 5-digit ZIP code required'
      }
    }

    if (step === 3) {
      if (!formData.proofOfIncome) newErrors.proofOfIncome = 'Proof of income is required'
      if (!formData.proofOfIdentity) newErrors.proofOfIdentity = 'Proof of identity is required'
      if (!formData.proofOfResidence) newErrors.proofOfResidence = 'Proof of residence is required'
    }

    if (step === 4) {
      if (!signature.trim()) newErrors.signature = 'Signature is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
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
      const applicationNumber = 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      const enrollmentResult = {
        ...formData,
        signature,
        selectedPlan,
        applicationNumber,
        submittedDate: new Date().toISOString(),
        status: 'submitted'
      }
      setEnrollmentData(enrollmentResult)
      navigate('/enrollment/confirmation', { state: { applicationNumber } })
    }
  }

  const formatSSN = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
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
            <div className="step-label">
              {i === 0 && 'Personal Info'}
              {i === 1 && 'Contact Info'}
              {i === 2 && 'Documents'}
              {i === 3 && 'Review & Sign'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="enrollment-page">
      <div className="container-narrow">
        <div className="page-header">
          <h1>Enrollment Application</h1>
          <p>Complete your application to enroll in health insurance coverage</p>
          {selectedPlan && (
            <div className="selected-plan-banner">
              <strong>Selected Plan:</strong> {selectedPlan.name} - ${selectedPlan.premium === 0 ? 'FREE' : `${selectedPlan.premium}/month`}
            </div>
          )}
        </div>

        {renderProgressBar()}

        <div className="card">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Personal Information</h2>
                <p className="step-description">Please provide your personal details.</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="middleName" className="form-label">Middle Name</label>
                    <input
                      type="text"
                      id="middleName"
                      name="middleName"
                      className="form-input"
                      value={formData.middleName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-input"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    {errors.dateOfBirth && <div className="form-error">{errors.dateOfBirth}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="ssn" className="form-label">Social Security Number *</label>
                    <input
                      type="text"
                      id="ssn"
                      name="ssn"
                      className="form-input"
                      value={formData.ssn}
                      onChange={(e) => {
                        const formatted = formatSSN(e.target.value)
                        setFormData(prev => ({ ...prev, ssn: formatted }))
                      }}
                      placeholder="XXX-XX-XXXX"
                      maxLength="11"
                    />
                    {errors.ssn && <div className="form-error">{errors.ssn}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                      />
                      <span>Male</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                      />
                      <span>Female</span>
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === 'Other'}
                        onChange={handleInputChange}
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {errors.gender && <div className="form-error">{errors.gender}</div>}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h2>Contact Information</h2>
                <p className="step-description">How can we reach you?</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value)
                        setFormData(prev => ({ ...prev, phone: formatted }))
                      }}
                      placeholder="(XXX) XXX-XXXX"
                      maxLength="14"
                    />
                    {errors.phone && <div className="form-error">{errors.phone}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <div className="form-error">{errors.address}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-input"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <div className="form-error">{errors.city}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state" className="form-label">State *</label>
                    <select
                      id="state"
                      name="state"
                      className="form-select"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">Select State</option>
                      <option value="AL">Alabama</option>
                      <option value="CA">California</option>
                      <option value="FL">Florida</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                    {errors.state && <div className="form-error">{errors.state}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className="form-input"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      maxLength="5"
                    />
                    {errors.zipCode && <div className="form-error">{errors.zipCode}</div>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h2>Required Documents</h2>
                <p className="step-description">Please upload the following documents to complete your application.</p>

                <div className="document-upload-section">
                  <div className="upload-card">
                    <h4>Proof of Income</h4>
                    <p>Upload recent pay stubs, tax returns, or other income documentation</p>
                    <div className="file-upload">
                      <input
                        type="file"
                        id="proofOfIncome"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('proofOfIncome', e)}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="proofOfIncome" className="btn btn-secondary">
                        {uploadedFiles.proofOfIncome ? '✓ ' + uploadedFiles.proofOfIncome : '📄 Choose File'}
                      </label>
                    </div>
                    {errors.proofOfIncome && <div className="form-error">{errors.proofOfIncome}</div>}
                  </div>

                  <div className="upload-card">
                    <h4>Proof of Identity</h4>
                    <p>Upload driver's license, passport, or state ID</p>
                    <div className="file-upload">
                      <input
                        type="file"
                        id="proofOfIdentity"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('proofOfIdentity', e)}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="proofOfIdentity" className="btn btn-secondary">
                        {uploadedFiles.proofOfIdentity ? '✓ ' + uploadedFiles.proofOfIdentity : '📄 Choose File'}
                      </label>
                    </div>
                    {errors.proofOfIdentity && <div className="form-error">{errors.proofOfIdentity}</div>}
                  </div>

                  <div className="upload-card">
                    <h4>Proof of Residence</h4>
                    <p>Upload utility bill, lease agreement, or mortgage statement</p>
                    <div className="file-upload">
                      <input
                        type="file"
                        id="proofOfResidence"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('proofOfResidence', e)}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="proofOfResidence" className="btn btn-secondary">
                        {uploadedFiles.proofOfResidence ? '✓ ' + uploadedFiles.proofOfResidence : '📄 Choose File'}
                      </label>
                    </div>
                    {errors.proofOfResidence && <div className="form-error">{errors.proofOfResidence}</div>}
                  </div>
                </div>

                <div className="alert alert-info">
                  <strong>Accepted file formats:</strong> PDF, JPG, JPEG, PNG (max 10MB per file)
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-content">
                <h2>Review & Sign</h2>
                <p className="step-description">Please review your information and sign to submit your application.</p>

                <div className="review-section">
                  <h4>Personal Information</h4>
                  <div className="review-grid">
                    <div><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</div>
                    <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                    <div><strong>Gender:</strong> {formData.gender}</div>
                  </div>
                </div>

                <div className="review-section">
                  <h4>Contact Information</h4>
                  <div className="review-grid">
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                    <div><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</div>
                  </div>
                </div>

                <div className="review-section">
                  <h4>Uploaded Documents</h4>
                  <div className="review-grid">
                    <div>✓ Proof of Income: {uploadedFiles.proofOfIncome}</div>
                    <div>✓ Proof of Identity: {uploadedFiles.proofOfIdentity}</div>
                    <div>✓ Proof of Residence: {uploadedFiles.proofOfResidence}</div>
                  </div>
                </div>

                <div className="signature-section">
                  <h4>Digital Signature</h4>
                  <p>By signing below, I certify that all information provided is true and accurate.</p>
                  <div className="form-group">
                    <label htmlFor="signature" className="form-label">Type your full name as signature *</label>
                    <input
                      type="text"
                      id="signature"
                      className="form-input signature-input"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Your Full Name"
                    />
                    {errors.signature && <div className="form-error">{errors.signature}</div>}
                  </div>
                  <p className="signature-date">Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="alert alert-warning">
                  <strong>Important:</strong> By submitting this application, you agree to the terms and conditions of enrollment and authorize us to verify the information provided.
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
                <button type="submit" className="btn btn-success btn-large">
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="save-progress-box">
          <h4>Need to finish later?</h4>
          <p>You can save your progress and return to complete your application at any time.</p>
          <button className="btn btn-secondary">Save & Exit</button>
        </div>
      </div>
    </div>
  )
}

export default EnrollmentApplication

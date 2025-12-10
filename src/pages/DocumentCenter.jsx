import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import './DocumentCenter.css'

function DocumentCenter() {
  const { selectedPlan, enrollmentData } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const documents = [
    {
      id: 'insurance-card',
      title: 'Digital Insurance Card',
      category: 'insurance',
      type: 'ID Card',
      date: '2024-01-15',
      size: '125 KB',
      description: 'Your current health insurance ID card with member information'
    },
    {
      id: 'policy-summary',
      title: 'Policy Summary & Benefits',
      category: 'coverage',
      type: 'PDF',
      date: '2024-01-15',
      size: '2.4 MB',
      description: 'Complete summary of your health insurance coverage and benefits'
    },
    {
      id: 'coverage-details',
      title: 'Detailed Coverage Information',
      category: 'coverage',
      type: 'PDF',
      date: '2024-01-15',
      size: '1.8 MB',
      description: 'In-depth information about what is covered under your plan'
    },
    {
      id: 'eob-1',
      title: 'Explanation of Benefits - March 2024',
      category: 'eob',
      type: 'PDF',
      date: '2024-03-10',
      size: '245 KB',
      description: 'EOB for services received in March 2024'
    },
    {
      id: 'eob-2',
      title: 'Explanation of Benefits - February 2024',
      category: 'eob',
      type: 'PDF',
      date: '2024-02-12',
      size: '198 KB',
      description: 'EOB for services received in February 2024'
    },
    {
      id: 'eob-3',
      title: 'Explanation of Benefits - January 2024',
      category: 'eob',
      type: 'PDF',
      date: '2024-01-15',
      size: '312 KB',
      description: 'EOB for services received in January 2024'
    },
    {
      id: 'tax-form',
      title: 'IRS Form 1095-B (2023)',
      category: 'tax',
      type: 'PDF',
      date: '2024-01-31',
      size: '156 KB',
      description: 'Health coverage tax form for 2023 tax year'
    },
    {
      id: 'enrollment-confirmation',
      title: 'Enrollment Confirmation',
      category: 'enrollment',
      type: 'PDF',
      date: '2024-01-15',
      size: '89 KB',
      description: 'Confirmation of your health insurance enrollment'
    },
    {
      id: 'welcome-packet',
      title: 'Member Welcome Packet',
      category: 'enrollment',
      type: 'PDF',
      date: '2024-01-15',
      size: '3.2 MB',
      description: 'Welcome information and getting started guide'
    },
    {
      id: 'preventive-care',
      title: 'Preventive Care Guidelines',
      category: 'resources',
      type: 'PDF',
      date: '2024-01-01',
      size: '1.1 MB',
      description: 'Information about recommended preventive care services'
    },
    {
      id: 'wellness-guide',
      title: 'Wellness & Health Resources',
      category: 'resources',
      type: 'PDF',
      date: '2024-01-01',
      size: '2.7 MB',
      description: 'Educational resources for maintaining your health'
    },
    {
      id: 'provider-directory',
      title: 'Provider Directory (PDF)',
      category: 'resources',
      type: 'PDF',
      date: '2024-01-01',
      size: '5.8 MB',
      description: 'Complete list of in-network healthcare providers'
    }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownload = (docId) => {
    alert(`Downloading ${docId}... (Demo: Download functionality would be implemented here)`)
  }

  const handlePrint = (docId) => {
    alert(`Printing ${docId}... (Demo: Print functionality would be implemented here)`)
  }

  return (
    <div className="documents-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Member Portal</span>
          <span>/</span>
          <span>Documents</span>
        </div>

        <div className="page-header">
          <h1>Document Center</h1>
          <p>Access all your health insurance documents in one place</p>
        </div>

        {selectedPlan && (
          <div className="member-info-card">
            <h3>Your Plan</h3>
            <div className="member-info-content">
              <div className="info-item">
                <strong>Plan Name:</strong> {selectedPlan.name}
              </div>
              <div className="info-item">
                <strong>Plan Type:</strong> {selectedPlan.type}
              </div>
              <div className="info-item">
                <strong>Monthly Premium:</strong> ${selectedPlan.premium === 0 ? 'FREE' : selectedPlan.premium}
              </div>
              {enrollmentData && (
                <div className="info-item">
                  <strong>Member Since:</strong> {new Date(enrollmentData.submittedDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="insurance-card-spotlight">
          <div className="digital-card">
            <div className="card-header-section">
              <div className="card-logo">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#ffffff"/>
                  <path d="M24 10L34 16V28L24 34L14 28V16L24 10Z" fill="#0066cc"/>
                </svg>
                <div>
                  <div className="card-org">Department of Health Services</div>
                  <div className="card-plan">{selectedPlan?.name || 'Public Insurance Plan'}</div>
                </div>
              </div>
            </div>
            <div className="card-member-info">
              <div className="card-field">
                <div className="card-label">Member Name</div>
                <div className="card-value">{enrollmentData?.firstName || 'MEMBER'} {enrollmentData?.lastName || 'NAME'}</div>
              </div>
              <div className="card-field">
                <div className="card-label">Member ID</div>
                <div className="card-value">DHS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
              </div>
              <div className="card-field">
                <div className="card-label">Group Number</div>
                <div className="card-value">GRP-2024-001</div>
              </div>
              <div className="card-field">
                <div className="card-label">Effective Date</div>
                <div className="card-value">{new Date().toLocaleDateString()}</div>
              </div>
            </div>
            <div className="card-footer">
              <div className="card-copays">
                <div>Office: ${selectedPlan?.benefits.primaryCare || '$0'}</div>
                <div>Specialist: ${selectedPlan?.benefits.specialist || '$5'}</div>
                <div>ER: ${selectedPlan?.benefits.emergency || '$50'}</div>
              </div>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-block no-print" onClick={() => handleDownload('insurance-card')}>
              📥 Download Card
            </button>
            <button className="btn btn-secondary btn-block no-print" onClick={() => handlePrint('insurance-card')}>
              🖨️ Print Card
            </button>
            <button className="btn btn-secondary btn-block no-print">
              📧 Email Card
            </button>
          </div>
        </div>

        <div className="documents-section">
          <div className="documents-header">
            <h2>All Documents</h2>
            <div className="documents-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="form-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="insurance">Insurance Cards</option>
                <option value="coverage">Coverage Details</option>
                <option value="eob">Explanation of Benefits</option>
                <option value="tax">Tax Forms</option>
                <option value="enrollment">Enrollment Documents</option>
                <option value="resources">Resources & Guides</option>
              </select>
            </div>
          </div>

          <div className="documents-grid">
            {filteredDocuments.map(doc => (
              <div key={doc.id} className="document-card">
                <div className="document-icon">
                  {doc.category === 'insurance' && '🪪'}
                  {doc.category === 'coverage' && '📋'}
                  {doc.category === 'eob' && '📄'}
                  {doc.category === 'tax' && '🧾'}
                  {doc.category === 'enrollment' && '📝'}
                  {doc.category === 'resources' && '📚'}
                </div>
                <div className="document-info">
                  <h4>{doc.title}</h4>
                  <p className="document-description">{doc.description}</p>
                  <div className="document-meta">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{new Date(doc.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                <div className="document-actions">
                  <button
                    className="btn-icon no-print"
                    onClick={() => handleDownload(doc.id)}
                    title="Download"
                  >
                    📥
                  </button>
                  <button
                    className="btn-icon no-print"
                    onClick={() => handlePrint(doc.id)}
                    title="Print"
                  >
                    🖨️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="no-results">
              <h3>No documents found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        <div className="help-section-documents">
          <h3>Need a Document You Don't See?</h3>
          <p>Contact our member services team for assistance accessing additional documents.</p>
          <div className="help-options-documents">
            <a href="tel:1-800-555-4325" className="btn btn-secondary">
              📞 Call Support
            </a>
            <button className="btn btn-secondary">
              💬 Live Chat
            </button>
            <a href="mailto:documents@dhspublicinsurance.gov" className="btn btn-secondary">
              📧 Email Request
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentCenter

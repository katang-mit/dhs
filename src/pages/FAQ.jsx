import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faqData, faqCategories } from '../data/faqs'
import './FAQ.css'

function FAQ() {
  // State for accordion (which FAQ is open)
  const [openFaqId, setOpenFaqId] = useState(null)

  // State for category filter
  const [selectedCategory, setSelectedCategory] = useState('All Topics')

  // State for feedback (which FAQs user found helpful)
  const [helpfulFaqs, setHelpfulFaqs] = useState(() => {
    const saved = localStorage.getItem('faqFeedback')
    return saved ? JSON.parse(saved) : {}
  })

  // Persist feedback to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('faqFeedback', JSON.stringify(helpfulFaqs))
  }, [helpfulFaqs])

  // Toggle accordion open/close
  const toggleFaq = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

  // Handle thumbs up/down feedback
  const handleFeedback = (faqId, isHelpful) => {
    setHelpfulFaqs(prev => ({
      ...prev,
      [faqId]: isHelpful
    }))
  }

  // Filter FAQs by category
  const filteredFaqs = selectedCategory === 'All Topics'
    ? faqData
    : faqData.filter(faq => faq.category === selectedCategory)

  return (
    <div className="faq-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>FAQ</span>
        </div>

        <div className="page-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about health insurance coverage, eligibility, and enrollment</p>
        </div>

        {/* Category Filter */}
        <div className="faq-filters">
          <label htmlFor="category-filter" className="filter-label">Filter by Topic:</label>
          <select
            id="category-filter"
            className="form-select category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {faqCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="results-count">
            {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
          </span>
        </div>

        {/* FAQ List with Accordions */}
        <div className="faq-list">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button
                className={`faq-question ${openFaqId === faq.id ? 'active' : ''}`}
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openFaqId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="faq-category-tag">{faq.category}</span>
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">{openFaqId === faq.id ? '−' : '+'}</span>
              </button>

              <div
                id={`faq-answer-${faq.id}`}
                className={`faq-answer ${openFaqId === faq.id ? 'open' : ''}`}
                aria-hidden={openFaqId !== faq.id}
              >
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>

                  <div className="faq-feedback">
                    <span className="feedback-label">Was this helpful?</span>
                    <div className="feedback-buttons">
                      <button
                        className={`feedback-btn ${helpfulFaqs[faq.id] === true ? 'active' : ''}`}
                        onClick={() => handleFeedback(faq.id, true)}
                        aria-label="Yes, this was helpful"
                      >
                        <span className="feedback-icon">👍</span>
                        <span className="feedback-text">Yes</span>
                      </button>
                      <button
                        className={`feedback-btn ${helpfulFaqs[faq.id] === false ? 'active' : ''}`}
                        onClick={() => handleFeedback(faq.id, false)}
                        aria-label="No, this was not helpful"
                      >
                        <span className="feedback-icon">👎</span>
                        <span className="feedback-text">No</span>
                      </button>
                    </div>
                    {helpfulFaqs[faq.id] !== undefined && (
                      <span className="feedback-thanks">Thank you for your feedback!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <section className="faq-help-section">
          <div className="faq-help-card">
            <h2>Still Have Questions?</h2>
            <p>If you couldn't find the answer you were looking for, our support team is here to help.</p>
            <div className="faq-help-options">
              <div className="help-option">
                <h4>📞 Call Us</h4>
                <p><strong>1-800-555-HEALTH (4325)</strong></p>
                <p>Monday-Friday, 8AM-6PM</p>
              </div>
              <div className="help-option">
                <h4>📧 Email Support</h4>
                <p>info@dhspublicinsurance.gov</p>
                <p>Response within 24-48 hours</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FAQ

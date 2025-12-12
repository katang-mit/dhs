import React, { useState } from 'react'
import './FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [feedback, setFeedback] = useState({})

  const faqs = [
    {
      question: 'Who is eligible for public health insurance?',
      answer: 'Eligibility is based on household size, income, age, disability status, and other factors. Use our eligibility questionnaire to find out which programs you qualify for. Generally, individuals and families with income up to 400% of the Federal Poverty Level may qualify for assistance.'
    },
    {
      question: 'How much does health insurance cost?',
      answer: 'The cost varies based on the plan you choose and your household income. Many families qualify for free or low-cost coverage through Medicaid or CHIP. Marketplace plans range from Bronze to Platinum tiers, with monthly premiums starting as low as $0 for those who qualify for subsidies.'
    },
    {
      question: 'What is the difference between Medicaid, CHIP, and Marketplace plans?',
      answer: 'Medicaid provides free or low-cost coverage for low-income individuals and families. CHIP (Children\'s Health Insurance Program) covers children in families that earn too much for Medicaid but can\'t afford private insurance. Marketplace plans are private insurance options with financial assistance available based on income.'
    },
    {
      question: 'When can I enroll in health insurance?',
      answer: 'Open Enrollment typically runs from November 1 to January 15 each year. However, you may qualify for a Special Enrollment Period if you experience certain life events like losing other coverage, getting married, having a baby, or moving. Medicaid and CHIP enrollment is open year-round.'
    },
    {
      question: 'What documents do I need to apply?',
      answer: 'You\'ll need proof of identity (driver\'s license, passport), Social Security numbers for household members, proof of income (pay stubs, tax returns), and proof of residency. Additional documents may be required depending on your circumstances.'
    },
    {
      question: 'How do I find a doctor or hospital in my plan\'s network?',
      answer: 'Use our Provider Directory to search for doctors, hospitals, specialists, and pharmacies. You can filter by location, specialty, languages spoken, and accepted insurance plans. Make sure to verify the provider accepts your specific plan before scheduling an appointment.'
    },
    {
      question: 'What services are covered under my plan?',
      answer: 'All plans cover essential health benefits including doctor visits, emergency services, hospitalization, prescription drugs, preventive care, mental health services, and more. The specific coverage details vary by plan tier (Bronze, Silver, Gold, Platinum). Review the plan comparison page for detailed benefits.'
    },
    {
      question: 'How do I access my insurance card and documents?',
      answer: 'Log in to the Member Portal to access your digital insurance card, coverage documents, tax forms (1095-A), and other important information. You can download and print your insurance card or save it to your mobile device.'
    },
    {
      question: 'What if I need help applying or have questions?',
      answer: 'We\'re here to help! Call us at 1-800-555-HEALTH (4325), Monday-Friday 8AM-6PM. You can also chat with a representative during business hours or email us at info@dhspublicinsurance.gov. Assistance is available in multiple languages.'
    },
    {
      question: 'Can I change my plan after enrollment?',
      answer: 'Generally, you can only change plans during Open Enrollment or if you qualify for a Special Enrollment Period. However, if you experience a significant life change (marriage, birth, job loss), you may be eligible to change plans within 60 days of the event.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleFeedback = (index, type) => {
    setFeedback({ ...feedback, [index]: type })
  }

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p className="hero-subtitle">
            Find answers to common questions about eligibility, enrollment, coverage, and more.
          </p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container-narrow">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>

                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>

                    <div className="faq-feedback">
                      <span className="feedback-label">Was this helpful?</span>
                      <div className="feedback-buttons">
                        <button
                          className={`feedback-btn ${feedback[index] === 'up' ? 'active' : ''}`}
                          onClick={() => handleFeedback(index, 'up')}
                          aria-label="Thumbs up"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9V17M2 10V16C2 16.5304 2.21071 17.0391 2.58579 17.4142C2.96086 17.7893 3.46957 18 4 18H14.28C14.7623 18.0055 15.2304 17.8364 15.5979 17.524C15.9654 17.2116 16.2077 16.7769 16.28 16.3L17.66 7.3C17.7035 7.01977 17.6842 6.73334 17.6033 6.46122C17.5225 6.1891 17.3821 5.93804 17.1919 5.72582C17.0016 5.5136 16.7661 5.34566 16.5016 5.23445C16.2371 5.12324 15.9499 5.07141 15.66 5.08H12V2.08C12 1.61566 11.8156 1.17028 11.4874 0.84204C11.1592 0.513802 10.7139 0.329407 10.25 0.329407C10.0163 0.329407 9.79186 0.423314 9.62566 0.589514C9.45946 0.755714 9.36555 0.980059 9.36555 1.21375C9.36555 1.47306 9.29125 1.72725 9.15125 1.94793L6.6 5.95C6.37015 6.31869 6.07936 6.64071 5.73959 6.90181C5.39981 7.16291 5.01662 7.35845 4.61 7.48C4.1686 7.60969 3.77374 7.86898 3.48023 8.22371C3.18671 8.57844 3.00827 9.01365 2 10Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className={`feedback-btn ${feedback[index] === 'down' ? 'active' : ''}`}
                          onClick={() => handleFeedback(index, 'down')}
                          aria-label="Thumbs down"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 11V3M18 10V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H5.72C5.23771 1.99448 4.76964 2.16365 4.40211 2.47599C4.03457 2.78833 3.79229 3.22305 3.72 3.7L2.34 12.7C2.29648 12.9802 2.31583 13.2667 2.39666 13.5388C2.4775 13.8109 2.61794 14.062 2.80816 14.2742C2.99838 14.4864 3.23391 14.6543 3.49843 14.7656C3.76295 14.8768 4.05007 14.9286 4.34 14.92H8V17.92C8 18.3843 8.18437 18.8297 8.51256 19.158C8.84075 19.4862 9.28609 19.6706 9.75 19.6706C9.98369 19.6706 10.2081 19.5767 10.3743 19.4105C10.5405 19.2443 10.6344 19.0199 10.6344 18.7862C10.6344 18.5269 10.7087 18.2727 10.8487 18.0521L13.4 14.05C13.6298 13.6813 13.9206 13.3593 14.2604 13.0982C14.6002 12.8371 14.9834 12.6415 15.39 12.52C15.8314 12.3903 16.2263 12.131 16.5198 11.7763C16.8133 11.4216 16.9917 10.9864 18 10Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      {feedback[index] && (
                        <span className="feedback-thanks">Thank you for your feedback!</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still Have Questions?</h2>
            <p>Our support team is ready to help you.</p>
            <div className="cta-buttons">
              <a href="tel:1-800-555-4325" className="btn btn-primary">
                Call 1-800-555-HEALTH
              </a>
              <button className="btn btn-secondary">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ

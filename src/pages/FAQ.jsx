import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [feedback, setFeedback] = useState({});

  const faqs = [
    {
      id: 1,
      question: "Who is eligible for Medicaid?",
      answer: "Medicaid eligibility is based on your household income and size. Generally, households with income at or below 138% of the Federal Poverty Level may qualify. Pregnant women, children, parents, seniors, and individuals with disabilities may have different eligibility criteria."
    },
    {
      id: 2,
      question: "How do I apply for health insurance?",
      answer: "You can apply through our Eligibility Questionnaire to determine which programs you qualify for. After completing the questionnaire, you'll be directed to the appropriate enrollment application. You can also apply by phone or in person at a local DHS office."
    },
    {
      id: 3,
      question: "What's the difference between the plan tiers?",
      answer: "Bronze plans have the lowest monthly premiums but higher out-of-pocket costs. Silver plans offer moderate premiums and costs. Gold plans have higher premiums but lower costs when you need care. Platinum plans have the highest premiums but lowest out-of-pocket costs. Choose based on how often you expect to use healthcare services."
    },
    {
      id: 4,
      question: "When can I enroll in health insurance?",
      answer: "Open enrollment typically runs from November 1 to January 15 each year. However, you may qualify for a Special Enrollment Period if you experience certain life events such as losing other coverage, moving, getting married, or having a baby."
    },
    {
      id: 5,
      question: "What documents do I need to apply?",
      answer: "You'll need: Social Security numbers for household members, proof of income (pay stubs, tax returns, W-2 forms), proof of citizenship or legal residency, and current health insurance policy information if applicable."
    },
    {
      id: 6,
      question: "How do I find a doctor in my network?",
      answer: "Use our Provider Directory to search for healthcare providers by specialty, location, language, and other criteria. You can filter results to show only providers accepting new patients. Each provider's profile shows which insurance plans they accept."
    },
    {
      id: 7,
      question: "What if I need help with my application?",
      answer: "Free assistance is available through certified enrollment counselors. Call our helpline at 1-800-555-0123, visit a local DHS office, or use the live chat on our website. Assistance is available in multiple languages."
    },
    {
      id: 8,
      question: "How much will my health insurance cost?",
      answer: "Costs depend on the plan you choose and your household income. You may qualify for premium tax credits or cost-sharing reductions to lower your monthly payments and out-of-pocket costs. Use our Eligibility Questionnaire to estimate your costs."
    },
    {
      id: 9,
      question: "Can I change my plan after enrolling?",
      answer: "Generally, you can only change plans during the annual Open Enrollment Period. However, if you experience a qualifying life event, you may be eligible for a Special Enrollment Period to make changes within 60 days of the event."
    },
    {
      id: 10,
      question: "What services are covered by health insurance?",
      answer: "All plans cover essential health benefits including doctor visits, preventive care, emergency services, hospitalization, prescription drugs, laboratory services, mental health services, and maternity care. Specific coverage details vary by plan tier."
    }
  ];

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleFeedback = (id, type) => {
    setFeedback(prev => ({
      ...prev,
      [id]: type
    }));
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Find answers to common questions about health insurance, eligibility, enrollment, and more.
        </p>

        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleExpand(faq.id)}
                aria-expanded={expandedItems.has(faq.id)}
              >
                <span>{faq.question}</span>
                <span className={`faq-icon ${expandedItems.has(faq.id) ? 'expanded' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedItems.has(faq.id) && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>

                  <div className="faq-feedback">
                    <span className="feedback-label">Was this helpful?</span>
                    <div className="feedback-buttons">
                      <button
                        className={`feedback-btn ${feedback[faq.id] === 'up' ? 'active' : ''}`}
                        onClick={() => handleFeedback(faq.id, 'up')}
                        aria-label="Thumbs up"
                      >
                        👍
                      </button>
                      <button
                        className={`feedback-btn ${feedback[faq.id] === 'down' ? 'active' : ''}`}
                        onClick={() => handleFeedback(faq.id, 'down')}
                        aria-label="Thumbs down"
                      >
                        👎
                      </button>
                    </div>
                    {feedback[faq.id] && (
                      <span className="feedback-thank-you">Thank you for your feedback!</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h2>Still have questions?</h2>
          <p>Contact our support team for personalized assistance.</p>
          <div className="contact-options">
            <div className="contact-method">
              <strong>Phone:</strong> 1-800-555-0123
            </div>
            <div className="contact-method">
              <strong>Email:</strong> support@dhsinsurance.gov
            </div>
            <div className="contact-method">
              <strong>Hours:</strong> Monday-Friday, 8 AM - 6 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

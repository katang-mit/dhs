import React, { useState, useEffect } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const savedFeedback = localStorage.getItem('faqFeedback');
    if (savedFeedback) {
      setFeedback(JSON.parse(savedFeedback));
    }
  }, []);

  const handleFeedback = (questionId, isHelpful) => {
    const newFeedback = {
      ...feedback,
      [questionId]: isHelpful
    };
    setFeedback(newFeedback);
    localStorage.setItem('faqFeedback', JSON.stringify(newFeedback));
  };

  const faqData = [
    {
      id: 1,
      question: "What is the difference between Medicaid and Marketplace plans?",
      answer: "Medicaid is a state and federal program that provides free or low-cost health coverage to eligible low-income individuals and families. Marketplace plans are private insurance plans available through the Health Insurance Marketplace, with costs based on your income and eligibility for subsidies."
    },
    {
      id: 2,
      question: "How do I know if I'm eligible for Medicaid or CHIP?",
      answer: "Eligibility is primarily based on your household income and size, calculated as a percentage of the Federal Poverty Level (FPL). Generally, Medicaid covers adults earning up to 138% of FPL and children up to 200% of FPL. CHIP covers children in families earning too much for Medicaid but who can't afford private insurance. Use our Eligibility Questionnaire to check your eligibility."
    },
    {
      id: 3,
      question: "What's the difference between Bronze, Silver, Gold, and Platinum plans?",
      answer: "These metal tiers represent how you and your plan share costs. Bronze plans have the lowest monthly premiums but highest out-of-pocket costs (60% coverage). Silver plans offer moderate premiums and costs (70% coverage). Gold plans have higher premiums but lower out-of-pocket costs (80% coverage). Platinum plans have the highest premiums but lowest costs when you need care (90% coverage)."
    },
    {
      id: 4,
      question: "When can I enroll in health insurance?",
      answer: "The annual Open Enrollment Period typically runs from November 1 to January 15. However, you may qualify for a Special Enrollment Period if you experience certain life events such as losing other coverage, moving, getting married, having a baby, or losing household income. Medicaid and CHIP enrollment is available year-round."
    },
    {
      id: 5,
      question: "What documents do I need to apply?",
      answer: "You'll typically need: Social Security numbers for all household members, proof of income (pay stubs, W-2 forms, tax returns), proof of citizenship or immigration status, current health insurance information (if applicable), and employer information. The exact documents may vary based on your situation."
    },
    {
      id: 6,
      question: "What is a deductible?",
      answer: "A deductible is the amount you pay for covered health care services before your insurance plan starts to pay. For example, if your deductible is $1,500, you'll pay the first $1,500 of covered services yourself. After you meet your deductible, you typically pay only a copayment or coinsurance for covered services."
    },
    {
      id: 7,
      question: "What's the difference between an HMO and PPO plan?",
      answer: "HMO (Health Maintenance Organization) plans typically require you to choose a primary care physician and get referrals to see specialists. They usually have lower premiums but less flexibility. PPO (Preferred Provider Organization) plans offer more flexibility to see any provider without referrals, including out-of-network providers, but typically have higher premiums and costs."
    },
    {
      id: 8,
      question: "Are prescription drugs covered?",
      answer: "Yes, all Marketplace plans and most Medicaid programs cover prescription drugs. Each plan has a formulary (list of covered drugs) organized into tiers. Generic drugs typically have the lowest cost-sharing, while brand-name and specialty drugs have higher costs. Check your plan's formulary to see if your medications are covered."
    },
    {
      id: 9,
      question: "Can I see my current doctor?",
      answer: "It depends on your plan's provider network. Each plan has a network of doctors, hospitals, and other providers. You can usually see any provider in-network at the lowest cost. Some plans (like PPOs) allow you to see out-of-network providers at a higher cost. Use our Provider Directory to check if your doctor is in-network."
    },
    {
      id: 10,
      question: "What if I need help with my application?",
      answer: "Free help is available! You can contact a certified enrollment assister or navigator in your area who can help you understand your options, complete your application, and enroll in coverage. Call our helpline at 1-800-123-4567 or visit one of our enrollment assistance locations."
    },
    {
      id: 11,
      question: "How much will I pay each month?",
      answer: "Your monthly premium depends on several factors: the plan you choose (Bronze, Silver, Gold, or Platinum), your age, location, household size, and income. You may qualify for premium tax credits that lower your monthly payment. Use our Plan Comparison tool to see estimated costs based on your situation."
    },
    {
      id: 12,
      question: "What is a premium tax credit?",
      answer: "A premium tax credit is a subsidy that helps lower your monthly insurance premium. You may qualify if your household income is between 100% and 400% of the Federal Poverty Level and you're not eligible for other affordable coverage. The credit can be applied directly to your monthly premium or claimed when you file your taxes."
    }
  ];

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about health insurance enrollment and coverage</p>
        </div>

        <div className="faq-list">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
              <div className="faq-feedback">
                <span className="feedback-label">Was this helpful?</span>
                <div className="feedback-buttons">
                  <button
                    className={`feedback-btn ${feedback[item.id] === true ? 'active' : ''}`}
                    onClick={() => handleFeedback(item.id, true)}
                    aria-label="Thumbs up"
                  >
                    👍
                  </button>
                  <button
                    className={`feedback-btn ${feedback[item.id] === false ? 'active' : ''}`}
                    onClick={() => handleFeedback(item.id, false)}
                    aria-label="Thumbs down"
                  >
                    👎
                  </button>
                </div>
                {feedback[item.id] !== undefined && (
                  <span className="feedback-thanks">Thank you for your feedback!</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h2>Still have questions?</h2>
          <p>Contact our support team at <strong>1-800-123-4567</strong> or email <strong>support@dhsinsurance.gov</strong></p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

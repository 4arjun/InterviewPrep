import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is LeetCode Tracker?",
      answer: "LeetCode Tracker is a platform where students and professionals can share their interview experiences, helping others prepare for their job interviews. You can find detailed experiences from companies like Google, Microsoft, Amazon, and many more."
    },
    {
      id: 2,
      question: "How do I share my interview experience?",
      answer: "To share your experience, first create an account by signing up. Once logged in, click on 'Share Experience' from your dashboard. Fill out the form with details about your interview process, questions asked, and preparation tips."
    },
    {
      id: 3,
      question: "Is my data private and secure?",
      answer: "Yes, we take privacy very seriously. You can choose to share your experience anonymously. We use industry-standard security measures to protect your data. You have full control over what information you share."
    },
    {
      id: 4,
      question: "Can I stay anonymous while sharing?",
      answer: "Absolutely! We provide an anonymity toggle when sharing your experience. You can contribute valuable insights without revealing your identity."
    },
    {
      id: 5,
      question: "How are posts moderated?",
      answer: "Our community guidelines ensure high-quality content. Posts are reviewed for authenticity and relevance. Users can report inappropriate content, and our moderation team reviews flagged posts promptly."
    },
    {
      id: 6,
      question: "Can I edit or delete my posts?",
      answer: "Yes, you can edit or delete your experiences anytime from your profile page. Go to 'My Contributions' to manage your posts."
    },
    {
      id: 7,
      question: "How do I search for specific companies or roles?",
      answer: "Use the search bar and filters on the 'Explore Experiences' page. You can filter by company, role, college, year, and tags to find relevant experiences."
    },
    {
      id: 8,
      question: "What information should I include in my experience?",
      answer: "Include details about the company, role, interview rounds, questions asked, your preparation strategy, and tips for future candidates. The more detailed, the more helpful it is for others."
    },
    {
      id: 9,
      question: "Can I save experiences to read later?",
      answer: "Yes, you can save any experience by clicking the bookmark icon. Access your saved posts from your profile page."
    },
    {
      id: 10,
      question: "How do I get notifications about new posts?",
      answer: "You can enable email notifications in your settings. We'll notify you about new experiences from companies or roles you're interested in."
    },
    {
      id: 11,
      question: "Is there a mobile app?",
      answer: "Currently, we offer a mobile-responsive website. You can access all features through your mobile browser. A dedicated mobile app is in development."
    },
    {
      id: 12,
      question: "How can I contact support?",
      answer: "You can reach us through the Contact page, send an email to support@leetcodetracker.com, or use the feedback form. We typically respond within 24-48 hours."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <Link to="/" className="faq-logo">LeetCode Tracker</Link>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our platform and services.</p>
      </div>

      <div className="faq-content">
        <div className="faq-search">
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            className="search-input"
          />
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className={`faq-item ${openFAQ === faq.id ? 'open' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openFAQ === faq.id ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <div className="help-section">
            <h3>Still have questions?</h3>
            <p>Can't find what you're looking for? We're here to help!</p>
            <div className="help-buttons">
              <Link to="/contact" className="contact-btn">Contact Support</Link>
              <a href="mailto:support@leetcodetracker.com" className="email-btn">
                Email Us
              </a>
            </div>
          </div>

          <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/auth">Sign Up</Link></li>
              <li><Link to="/explore">Browse Experiences</Link></li>
              <li><Link to="/share">Share Your Story</Link></li>
              <li><Link to="/">Back to Home</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 
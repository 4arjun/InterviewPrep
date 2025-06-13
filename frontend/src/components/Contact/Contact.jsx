import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      feedbackType: 'general',
      message: ''
    });
  };

  if (submitted) {
    return (
      <div className="contact-container">
        <div className="contact-success">
          <div className="success-content">
            <h2>Thank you for reaching out!</h2>
            <p>We've received your message and will get back to you within 24-48 hours.</p>
            <Link to="/" className="back-home-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <Link to="/" className="contact-logo">LeetCode Tracker</Link>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="feedbackType">Feedback Type</label>
              <select
                id="feedbackType"
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleInputChange}
              >
                <option value="general">General Inquiry</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>support@leetcodetracker.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💬</span>
              <div>
                <h4>Response Time</h4>
                <p>We typically respond within 24-48 hours</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🌐</span>
              <div>
                <h4>Social Media</h4>
                <p>Follow us for updates and tips</p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h3>Quick Help</h3>
            <div className="faq-item">
              <h4>How do I share my experience?</h4>
              <p>Sign up for an account and click "Share Experience" from your dashboard.</p>
            </div>
            <div className="faq-item">
              <h4>Is my data private?</h4>
              <p>Yes, we take privacy seriously. You can share anonymously if preferred.</p>
            </div>
            <div className="faq-item">
              <h4>Can I edit my posts?</h4>
              <p>Yes, you can edit or delete your experiences from your profile page.</p>
            </div>
            <Link to="/faq" className="view-all-faq">View All FAQs →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    experiences: 1234,
    contributors: 567,
    companies: 89
  });

  const handleExploreClick = () => {
    navigate('/auth');
  };

  const handleSignUpClick = () => {
    navigate('/auth');
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">LeetCode Tracker</Link>
          <div className="nav-links">
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/faq" className="nav-link">FAQ</Link>
            <Link to="/auth" className="nav-link">Login</Link>
            <Link to="/auth" className="nav-link nav-signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Crack your next interview with real stories and insights</h1>
          <p className="hero-subtitle">Join thousands of students sharing their interview experiences</p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleExploreClick}>
              Explore Experiences
            </button>
            <button className="cta-secondary" onClick={handleSignUpClick}>
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📝</span>
            <h3>Share Experiences</h3>
            <p>Share your interview journey and help others succeed</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Smart Filters</h3>
            <p>Find relevant experiences by company, college, or role</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💡</span>
            <h3>Prep Tips</h3>
            <p>Get valuable insights and preparation strategies</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>{stats.experiences}+</h3>
            <p>Experiences Shared</p>
          </div>
          <div className="stat-item">
            <h3>{stats.contributors}+</h3>
            <p>Active Contributors</p>
          </div>
          <div className="stat-item">
            <h3>{stats.companies}+</h3>
            <p>Companies Covered</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Success Stories</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"This platform helped me prepare for my Google interview. The detailed experiences were invaluable!"</p>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/40" alt="User" />
                <div>
                  <h4>Rahul Sharma</h4>
                  <p>SDE at Google</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The preparation tips and company-specific experiences made all the difference in my interview process."</p>
              <div className="testimonial-author">
                <img src="https://via.placeholder.com/40" alt="User" />
                <div>
                  <h4>Priya Patel</h4>
                  <p>SDE at Microsoft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Experiences Preview */}
      <section className="recent-experiences">
        <h2>Recent Experiences</h2>
        <div className="experiences-grid">
          <div className="experience-card">
            <div className="experience-header">
              <h3>Google SDE Interview</h3>
              <span className="company-tag">Google</span>
            </div>
            <p className="experience-summary">Technical rounds focused on DSA and system design...</p>
            <div className="experience-meta">
              <span>👁️ 245 views</span>
              <span>❤️ 45 likes</span>
            </div>
          </div>
          <div className="experience-card">
            <div className="experience-header">
              <h3>Microsoft SWE Interview</h3>
              <span className="company-tag">Microsoft</span>
            </div>
            <p className="experience-summary">Coding rounds with emphasis on problem-solving...</p>
            <div className="experience-meta">
              <span>👁️ 189 views</span>
              <span>❤️ 32 likes</span>
            </div>
          </div>
        </div>
        <button className="view-more-btn" onClick={handleExploreClick}>
          View More Experiences
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><a href="#help">Help Center</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LeetCode Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 
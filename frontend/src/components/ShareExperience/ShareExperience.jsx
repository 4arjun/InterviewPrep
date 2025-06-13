import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import './ShareExperience.css';

const ShareExperience = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    company: '',
    role: '',
    interviewType: 'on-campus',
    jobLocation: '',
    offeredPackage: '',
    
    // Academic & Background Info
    college: '',
    department: '',
    graduationYear: new Date().getFullYear(),
    cgpa: '',
    resumeLink: '',
    
    // Interview Timeline
    interviewMonth: '',
    interviewYear: new Date().getFullYear(),
    numberOfRounds: 1,
    
    // Round-wise Details (Dynamic)
    rounds: [
      {
        id: 1,
        title: '',
        type: 'technical',
        mode: 'online',
        duration: '',
        questionsAsked: '',
        yourResponse: '',
        outcome: 'cleared'
      }
    ],
    
    // Final Outcome
    finalOutcome: 'selected',
    offerAccepted: true,
    numberOfOffers: 1,
    
    // Preparation Strategy
    preparationStrategy: '',
    whatToDoDifferently: '',
    tipsForJuniors: '',
    
    // Tags / Metadata
    tags: [],
    difficultyRating: 'medium',
    preparationTime: '1-3-months',
    
    // Privacy and Consent
    showProfile: false,
    agreeToTerms: false
  });

  const [currentTag, setCurrentTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('experienceDraft');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isDraft) {
      localStorage.setItem('experienceDraft', JSON.stringify(formData));
    }
  }, [formData, isDraft]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoundChange = (roundId, field, value) => {
    setFormData(prev => ({
      ...prev,
      rounds: prev.rounds.map(round =>
        round.id === roundId ? { ...round, [field]: value } : round
      )
    }));
  };

  const addRound = () => {
    const newRound = {
      id: Date.now(),
      title: '',
      type: 'technical',
      mode: 'online',
      duration: '',
      questionsAsked: '',
      yourResponse: '',
      outcome: 'cleared'
    };
    setFormData(prev => ({
      ...prev,
      rounds: [...prev.rounds, newRound],
      numberOfRounds: prev.rounds.length + 1
    }));
  };

  const removeRound = (roundId) => {
    if (formData.rounds.length > 1) {
      setFormData(prev => ({
        ...prev,
        rounds: prev.rounds.filter(round => round.id !== roundId),
        numberOfRounds: prev.rounds.length - 1
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const saveDraft = async () => {
    setLoading(true);
    setIsDraft(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('experienceDraft', JSON.stringify(formData));
      alert('Draft saved successfully!');
    } catch (error) {
      alert('Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
      setIsDraft(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions to continue.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Get existing experiences from localStorage
      const existingExperiences = JSON.parse(localStorage.getItem('experiences') || '[]');
      
      // Create new experience object
      const newExperience = {
        id: Date.now(), // Use timestamp as unique ID
        company: formData.company,
        role: formData.role,
        college: formData.college,
        year: formData.graduationYear,
        offerType: formData.interviewType,
        author: formData.showProfile ? user?.name || 'Anonymous' : 'Anonymous',
        isAnonymous: !formData.showProfile,
        date: new Date().toISOString(),
        views: 0,
        likes: 0,
        difficulty: formData.difficultyRating,
        tags: formData.tags,
        rounds: formData.numberOfRounds,
        finalOutcome: formData.finalOutcome,
        package: formData.offeredPackage,
        summary: formData.preparationStrategy,
        preparationTime: formData.preparationTime,
        // Add additional details
        department: formData.department,
        cgpa: formData.cgpa,
        jobLocation: formData.jobLocation,
        interviewMonth: formData.interviewMonth,
        interviewYear: formData.interviewYear,
        roundDetails: formData.rounds,
        whatToDoDifferently: formData.whatToDoDifferently,
        tipsForJuniors: formData.tipsForJuniors
      };
      
      // Add new experience to the array
      const updatedExperiences = [newExperience, ...existingExperiences];
      
      // Save to localStorage
      localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
      
      // Clear the draft
      localStorage.removeItem('experienceDraft');
      
      alert('Experience shared successfully!');
      navigate('/explore'); // Navigate to explore page instead of dashboard
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to share experience. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Predefined options
  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla',
    'Uber', 'Airbnb', 'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM',
    'Goldman Sachs', 'JPMorgan', 'Morgan Stanley', 'Flipkart', 'Zomato', 'Swiggy'
  ];

  const roles = [
    'Software Engineer', 'Software Developer', 'Product Manager', 'Data Scientist', 
    'Data Analyst', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 
    'Full Stack Developer', 'QA Engineer', 'Mobile Developer', 'ML Engineer', 
    'Security Engineer', 'Site Reliability Engineer', 'System Engineer',
    'Business Analyst', 'Consultant', 'Research Scientist'
  ];

  const colleges = [
    'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT Mandi',
    'IIIT Hyderabad', 'IIIT Bangalore', 'NIT Trichy', 'NIT Warangal', 'NIT Surathkal',
    'BITS Pilani', 'VIT Vellore', 'DTU', 'NSIT', 'Manipal Institute of Technology'
  ];

  const departments = [
    'Computer Science Engineering', 'Information Technology', 'Electronics and Communication',
    'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
    'Chemical Engineering', 'Biotechnology', 'Mathematics and Computing',
    'Engineering Physics', 'Production Engineering', 'Instrumentation Engineering'
  ];

  const commonTags = [
    'DSA-heavy', 'System Design', 'Behavioral', 'Resume-focused', 'HR-intensive',
    'Puzzle Round', 'Group Discussion', 'Case Study', 'Aptitude Test', 'Coding Round',
    'Technical Round', 'Managerial Round', 'Remote Interview', 'Multiple Rounds',
    'Quick Process', 'Long Process', 'Competitive Programming', 'Open Book',
    'Live Coding', 'Whiteboard Coding', 'Take Home Assignment'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const steps = [
    { id: 1, title: 'Basic Info', icon: '📋' },
    { id: 2, title: 'Academic', icon: '🎓' },
    { id: 3, title: 'Timeline', icon: '📅' },
    { id: 4, title: 'Rounds', icon: '🔄' },
    { id: 5, title: 'Outcome', icon: '🎯' },
    { id: 6, title: 'Strategy', icon: '💡' },
    { id: 7, title: 'Tags', icon: '🏷️' },
    { id: 8, title: 'Privacy', icon: '🔒' }
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="form-grid">
              <div className="form-group floating">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder=" "
                  list="companies-list"
                  required
                />
                <label htmlFor="company">Company Name *</label>
                <datalist id="companies-list">
                  {companies.map(company => (
                    <option key={company} value={company} />
                  ))}
                </datalist>
              </div>

              <div className="form-group floating">
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder=" "
                  list="roles-list"
                  required
                />
                <label htmlFor="role">Role / Position *</label>
                <datalist id="roles-list">
                  {roles.map(role => (
                    <option key={role} value={role} />
                  ))}
                </datalist>
              </div>

              <div className="form-group floating">
                <select
                  id="interviewType"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="on-campus">On-campus</option>
                  <option value="off-campus">Off-campus</option>
                  <option value="referral">Referral</option>
                  <option value="ppo">PPO</option>
                  <option value="internship">Internship</option>
                </select>
                <label htmlFor="interviewType">Type of Interview *</label>
              </div>

              <div className="form-group floating">
                <input
                  type="text"
                  id="jobLocation"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label htmlFor="jobLocation">Job Location</label>
              </div>

              <div className="form-group floating">
                <input
                  type="text"
                  id="offeredPackage"
                  name="offeredPackage"
                  value={formData.offeredPackage}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label htmlFor="offeredPackage">Offered Package</label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="form-grid">
              <div className="form-group floating">
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder=" "
                  list="colleges-list"
                  required
                />
                <label htmlFor="college">College Name *</label>
                <datalist id="colleges-list">
                  {colleges.map(college => (
                    <option key={college} value={college} />
                  ))}
                </datalist>
              </div>

              <div className="form-group floating">
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder=" "
                  list="departments-list"
                  required
                />
                <label htmlFor="department">Department/Branch *</label>
                <datalist id="departments-list">
                  {departments.map(dept => (
                    <option key={dept} value={dept} />
                  ))}
                </datalist>
              </div>

              <div className="form-group floating">
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  placeholder=" "
                  min="2020"
                  max="2030"
                  required
                />
                <label htmlFor="graduationYear">Graduation Year *</label>
              </div>

              <div className="form-group floating">
                <input
                  type="text"
                  id="cgpa"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label htmlFor="cgpa">CGPA / Percentage</label>
              </div>

              <div className="form-group floating full-width">
                <input
                  type="url"
                  id="resumeLink"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label htmlFor="resumeLink">Resume Link</label>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="form-grid">
              <div className="form-group floating">
                <select
                  id="interviewMonth"
                  name="interviewMonth"
                  value={formData.interviewMonth}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <label htmlFor="interviewMonth">Interview Month *</label>
              </div>

              <div className="form-group floating">
                <input
                  type="number"
                  id="interviewYear"
                  name="interviewYear"
                  value={formData.interviewYear}
                  onChange={handleInputChange}
                  placeholder=" "
                  min="2020"
                  max="2030"
                  required
                />
                <label htmlFor="interviewYear">Interview Year *</label>
              </div>

              <div className="form-group floating">
                <input
                  type="number"
                  id="numberOfRounds"
                  name="numberOfRounds"
                  value={formData.numberOfRounds}
                  onChange={handleInputChange}
                  placeholder=" "
                  min="1"
                  max="10"
                  required
                />
                <label htmlFor="numberOfRounds">Number of Rounds</label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="form-section">
              <h2>
                <span className="icon">🔄</span>
                Round-wise Details
              </h2>
              {formData.rounds.map((round, index) => (
                <div key={round.id} className="round-container">
                  <div className="round-header">
                    <h3>
                      <span className="round-number">Round {index + 1}</span>
                    </h3>
                    {formData.rounds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRound(round.id)}
                        className="remove-round-btn"
                      >
                        <span className="icon">×</span> Remove Round
                      </button>
                    )}
                  </div>
                  
                  <div className="round-form">
                    <div className="form-grid">
                      <div className="form-group floating">
                        <input
                          type="text"
                          value={round.title}
                          onChange={(e) => handleRoundChange(round.id, 'title', e.target.value)}
                          placeholder=" "
                          required
                        />
                        <label>Round Title *</label>
                      </div>

                      <div className="form-group floating">
                        <select
                          value={round.type}
                          onChange={(e) => handleRoundChange(round.id, 'type', e.target.value)}
                        >
                          <option value="technical">Technical</option>
                          <option value="coding">Coding</option>
                          <option value="hr">HR</option>
                          <option value="managerial">Managerial</option>
                          <option value="aptitude">Aptitude</option>
                          <option value="group-discussion">Group Discussion</option>
                          <option value="case-study">Case Study</option>
                          <option value="presentation">Presentation</option>
                        </select>
                        <label>Round Type *</label>
                      </div>

                      <div className="form-group floating">
                        <select
                          value={round.mode}
                          onChange={(e) => handleRoundChange(round.id, 'mode', e.target.value)}
                        >
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </select>
                        <label>Mode *</label>
                      </div>

                      <div className="form-group floating">
                        <input
                          type="text"
                          value={round.duration}
                          onChange={(e) => handleRoundChange(round.id, 'duration', e.target.value)}
                          placeholder=" "
                        />
                        <label>Duration</label>
                      </div>
                    </div>

                    <div className="form-group floating">
                      <textarea
                        value={round.questionsAsked}
                        onChange={(e) => handleRoundChange(round.id, 'questionsAsked', e.target.value)}
                        placeholder=" "
                        rows="4"
                        required
                      />
                      <label>Questions Asked *</label>
                    </div>

                    <div className="form-group floating">
                      <textarea
                        value={round.yourResponse}
                        onChange={(e) => handleRoundChange(round.id, 'yourResponse', e.target.value)}
                        placeholder=" "
                        rows="3"
                      />
                      <label>Your Response / Answer</label>
                    </div>

                    <div className="form-group floating">
                      <select
                        value={round.outcome}
                        onChange={(e) => handleRoundChange(round.id, 'outcome', e.target.value)}
                      >
                        <option value="cleared">Cleared</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <label>Outcome of this Round</label>
                    </div>
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addRound} className="add-round-btn">
                <span className="icon">+</span> Add Another Round
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <div className="form-section">
              <h2>
                <span className="icon">🎯</span>
                Final Outcome
              </h2>
              <div className="form-grid">
                <div className="form-group floating">
                  <select
                    id="finalOutcome"
                    name="finalOutcome"
                    value={formData.finalOutcome}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                    <option value="waiting">Waiting for Result</option>
                  </select>
                  <label htmlFor="finalOutcome">Final Result *</label>
                </div>

                {formData.finalOutcome === 'selected' && (
                  <>
                    <div className="form-group floating">
                      <select
                        id="offerAccepted"
                        name="offerAccepted"
                        value={formData.offerAccepted}
                        onChange={handleInputChange}
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                      <label htmlFor="offerAccepted">Offer Accepted</label>
                    </div>

                    <div className="form-group floating">
                      <input
                        type="number"
                        id="numberOfOffers"
                        name="numberOfOffers"
                        value={formData.numberOfOffers}
                        onChange={handleInputChange}
                        min="1"
                        max="20"
                        placeholder=" "
                      />
                      <label htmlFor="numberOfOffers">Number of Offers Received</label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <div className="form-section">
              <h2>
                <span className="icon">💡</span>
                Preparation Strategy
              </h2>
              <div className="form-group floating">
                <textarea
                  id="preparationStrategy"
                  name="preparationStrategy"
                  value={formData.preparationStrategy}
                  onChange={handleInputChange}
                  placeholder=" "
                  rows="4"
                  required
                />
                <label htmlFor="preparationStrategy">How did you prepare? *</label>
              </div>

              <div className="form-group floating">
                <textarea
                  id="whatToDoDifferently"
                  name="whatToDoDifferently"
                  value={formData.whatToDoDifferently}
                  onChange={handleInputChange}
                  placeholder=" "
                  rows="3"
                />
                <label htmlFor="whatToDoDifferently">What would you do differently?</label>
              </div>

              <div className="form-group floating">
                <textarea
                  id="tipsForJuniors"
                  name="tipsForJuniors"
                  value={formData.tipsForJuniors}
                  onChange={handleInputChange}
                  placeholder=" "
                  rows="4"
                  required
                />
                <label htmlFor="tipsForJuniors">Tips for Juniors *</label>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <div className="form-section">
              <h2>
                <span className="icon">🏷️</span>
                Tags & Metadata
              </h2>
              
              <div className="form-group">
                <label>Add Tags</label>
                <div className="tags-input">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add relevant tags"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button type="button" onClick={addTag} className="add-tag-btn">
                    <span className="icon">+</span> Add Tag
                  </button>
                </div>
                
                <div className="common-tags">
                  <span>Quick add:</span>
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (!formData.tags.includes(tag)) {
                          setFormData(prev => ({
                            ...prev,
                            tags: [...prev.tags, tag]
                          }));
                        }
                      }}
                      className="common-tag-btn"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                
                <div className="selected-tags">
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="remove-tag-btn"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group floating">
                  <select
                    id="difficultyRating"
                    name="difficultyRating"
                    value={formData.difficultyRating}
                    onChange={handleInputChange}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <label htmlFor="difficultyRating">Difficulty Rating</label>
                </div>

                <div className="form-group floating">
                  <select
                    id="preparationTime"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                  >
                    <option value="less-than-1-month">&lt; 1 month</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-plus-months">3+ months</option>
                  </select>
                  <label htmlFor="preparationTime">Time Taken to Prepare</label>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="step-content">
            <div className="form-section">
              <h2>
                <span className="icon">🔒</span>
                Privacy & Consent
              </h2>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="showProfile"
                    checked={formData.showProfile}
                    onChange={handleInputChange}
                  />
                  <span style={{ color: "black" }}>Show my name/profile with this experience</span>
                  <small style={{ color: "black" }}>(Uncheck to post anonymously)</small>
                </label>

                <label style={{ color: "black" }} className="checkbox-label required">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span style={{ color: "black" }}>I agree to the terms of use and community guidelines *</span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="share-experience-container">
        <div className="preview-container">
          <div className="preview-header">
            <h2>Preview Your Experience</h2>
            <div className="preview-actions">
              <button onClick={() => setShowPreview(false)} className="edit-btn">
                <span className="icon">✏️</span> Edit
              </button>
              <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
                <span className="icon">📤</span>
                {loading ? 'Submitting...' : 'Submit Experience'}
              </button>
            </div>
          </div>
          <div className="preview-content">
            <h3>{formData.company} - {formData.role}</h3>
            <p><strong>Type:</strong> {formData.interviewType}</p>
            <p><strong>College:</strong> {formData.college}</p>
            <p><strong>Interview Date:</strong> {formData.interviewMonth} {formData.interviewYear}</p>
            <p><strong>Final Outcome:</strong> {formData.finalOutcome}</p>
            {/* Add more preview content as needed */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="share-experience-container">
      <div className="share-header">
        <Link to="/dashboard" className="back-link">
          <span className="icon">←</span> Back to Dashboard
        </Link>
        <h1>Share Your Interview Experience</h1>
        <p>Help fellow candidates by sharing your detailed interview journey</p>
      </div>

      <div className="experience-form-wrapper">
        <div className="form-progress">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`progress-step ${activeStep === step.id ? 'active' : ''} ${
                activeStep > step.id ? 'completed' : ''
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-info">
                <span className="step-number">Step {step.id}</span>
                <span className="step-title">{step.title}</span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="experience-form">
          {renderStepContent()}

          <div className="form-navigation">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="nav-btn prev-btn"
              >
                <span className="icon">←</span> Previous
              </button>
            )}

            {activeStep < steps.length ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="nav-btn next-btn"
              >
                Next <span className="icon">→</span>
              </button>
            ) : (
              <div className="form-actions">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="draft-btn"
                  disabled={loading}
                >
                  <span className="icon">💾</span>
                  {loading && isDraft ? 'Saving...' : 'Save Draft'}
                </button>
                
                <button
                  type="button"
                  onClick={handlePreview}
                  className="preview-btn"
                  disabled={loading}
                >
                  <span className="icon">👁️</span>
                  Preview
                </button>
                
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading || !formData.agreeToTerms}
                >
                  <span className="icon">📤</span>
                  {loading ? 'Submitting...' : 'Submit Experience'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareExperience; 
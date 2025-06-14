import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import './ExperienceView.css';

const ExperienceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const loadExperience = async () => {
      setLoading(true);
      try {
        // Fetch specific experience from backend API
        const response = await fetch(`http://127.0.0.1:8000/api/experiences/${id}/`);
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/explore'); // Redirect if experience not found
            return;
          }
          throw new Error('Failed to fetch experience');
        }
        const foundExperience = await response.json();
        
        // Map backend fields to frontend fields
        const mappedExperience = {
          id: foundExperience.id,
          company: foundExperience.company,
          role: foundExperience.role,
          college: foundExperience.college,
          year: foundExperience.graduation_year,
          offerType: foundExperience.interview_type,
          author: foundExperience.author_name,
          isAnonymous: !foundExperience.show_profile,
          date: foundExperience.created_at,
          views: foundExperience.views || 0,
          likes: foundExperience.likes || 0,
          difficulty: foundExperience.difficulty_rating,
          tags: foundExperience.tags || [],
          rounds: foundExperience.number_of_rounds,
          finalOutcome: foundExperience.final_outcome,
          package: foundExperience.offered_package,
          summary: foundExperience.preparation_strategy,
          preparationTime: foundExperience.preparation_time,
          preparationStrategy: foundExperience.preparation_strategy,
          tipsForJuniors: foundExperience.tips_for_juniors,
          whatToDoDifferently: foundExperience.what_to_do_differently,
          // Map rounds data
          roundDetails: foundExperience.rounds || [],
          // Additional fields
          department: foundExperience.department,
          cgpa: foundExperience.cgpa,
          resumeLink: foundExperience.resume_link,
          interviewMonth: foundExperience.interview_month,
          interviewYear: foundExperience.interview_year,
          offerAccepted: foundExperience.offer_accepted,
          numberOfOffers: foundExperience.number_of_offers,
          jobLocation: foundExperience.job_location
        };
        
        setExperience(mappedExperience);
        setViews(mappedExperience.views + 1);
        
        // TODO: Update views count in backend if needed
      } catch (error) {
        console.error('Error loading experience:', error);
        navigate('/explore');
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [id, navigate]);

  const handleLike = () => {
    if (!experience) return;
    setExperience(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
    setLiked(!liked);
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'rounds', title: 'Interview Rounds', icon: '🎯' },
    { id: 'preparation', title: 'Preparation', icon: '📚' },
    { id: 'insights', title: 'Insights', icon: '💡' }
  ];

  if (loading) {
    return (
      <div className="ev-container">
        <div className="ev-loading">
          <div className="ev-spinner"></div>
          <h2>Loading Experience...</h2>
          <p>Fetching interview details...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="ev-container">
        <div className="ev-not-found">
          <div className="ev-not-found-icon">🔍</div>
          <h2>Experience Not Found</h2>
          <p>The interview experience you're looking for doesn't exist or has been removed.</p>
          <Link to="/explore" className="ev-back-btn">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ev-container">
      {/* Animated Background */}
      <div className="ev-bg-animation"></div>
      
      {/* Header Section */}
      <div className="ev-header">
        <Link to="/explore" className="ev-back-link">
          <span className="icon">←</span>
          Back to Explore
        </Link>
        
        <div className="ev-hero">
          <div className="ev-hero-content">
            <div className="ev-company-badge">
              <div className="ev-company-logo">
                {experience.company ? experience.company[0] : '?'}
              </div>
              <div className="ev-company-info">
                <h1>{experience.company}</h1>
                <h2>{experience.role}</h2>
              </div>
            </div>
            
            <div className="ev-outcome-badge">
              <span className={`ev-outcome ${experience.finalOutcome}`}>
                {experience.finalOutcome === 'selected' ? '✅ Selected' : 
                 experience.finalOutcome === 'rejected' ? '❌ Rejected' : '⏳ Waiting'}
              </span>
            </div>
          </div>
          
          <div className="ev-hero-stats">
            <div className="ev-stat">
              <span className="ev-stat-icon">👁️</span>
              <span className="ev-stat-value">{views}</span>
              <span className="ev-stat-label">Views</span>
            </div>
            <button className={`ev-like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
              <span className="ev-stat-icon">❤️</span>
              <span className="ev-stat-value">{experience.likes}</span>
              <span className="ev-stat-label">Likes</span>
            </button>
            <div className="ev-stat">
              <span className="ev-stat-icon">📅</span>
              <span className="ev-stat-value">{new Date(experience.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <span className="ev-stat-label">Shared</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ev-main">
        {/* Navigation Sidebar */}
        <div className="ev-nav-sidebar">
          <div className="ev-nav-header">
            <h3>Sections</h3>
          </div>
          <div className="ev-nav-items">
            {sections.map(section => (
              <button
                key={section.id}
                className={`ev-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="ev-nav-icon">{section.icon}</span>
                <span className="ev-nav-title">{section.title}</span>
              </button>
            ))}
          </div>
          
          {/* Author Card */}
          <div className="ev-author-card">
            <div className="ev-author-avatar">👤</div>
            <div className="ev-author-info">
              <h4>{experience.isAnonymous ? 'Anonymous' : experience.author}</h4>
              <p>{experience.college}</p>
              <p className="ev-author-date">{new Date(experience.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="ev-content">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="ev-section" key="overview">
              <div className="ev-section-header">
                <h2>📋 Experience Overview</h2>
                <p>Complete details about this interview experience</p>
              </div>
              
              {/* Quick Info Grid */}
              <div className="ev-info-grid">
                <div className="ev-info-card">
                  <div className="ev-info-icon">🎓</div>
                  <div className="ev-info-content">
                    <span className="ev-info-label">College</span>
                    <span className="ev-info-value">{experience.college}</span>
                  </div>
                </div>
                
                {experience.department && (
                  <div className="ev-info-card">
                    <div className="ev-info-icon">🏛️</div>
                    <div className="ev-info-content">
                      <span className="ev-info-label">Department</span>
                      <span className="ev-info-value">{experience.department}</span>
                    </div>
                  </div>
                )}
                
                <div className="ev-info-card">
                  <div className="ev-info-icon">📅</div>
                  <div className="ev-info-content">
                    <span className="ev-info-label">Graduation Year</span>
                    <span className="ev-info-value">{experience.year}</span>
                  </div>
                </div>
                
                {experience.cgpa && (
                  <div className="ev-info-card">
                    <div className="ev-info-icon">📊</div>
                    <div className="ev-info-content">
                      <span className="ev-info-label">CGPA</span>
                      <span className="ev-info-value">{experience.cgpa}</span>
                    </div>
                  </div>
                )}
                
                <div className="ev-info-card">
                  <div className="ev-info-icon">🎯</div>
                  <div className="ev-info-content">
                    <span className="ev-info-label">Interview Type</span>
                    <span className="ev-info-value">{experience.offerType}</span>
                  </div>
                </div>
                
                {experience.jobLocation && (
                  <div className="ev-info-card">
                    <div className="ev-info-icon">📍</div>
                    <div className="ev-info-content">
                      <span className="ev-info-label">Job Location</span>
                      <span className="ev-info-value">{experience.jobLocation}</span>
                    </div>
                  </div>
                )}
                
                <div className="ev-info-card">
                  <div className="ev-info-icon">⚡</div>
                  <div className="ev-info-content">
                    <span className="ev-info-label">Difficulty</span>
                    <span className={`ev-info-value ev-difficulty ${experience.difficulty?.toLowerCase()}`}>
                      {experience.difficulty}
                    </span>
                  </div>
                </div>
                
                {experience.package && experience.package !== 'N/A' && (
                  <div className="ev-info-card">
                    <div className="ev-info-icon">💰</div>
                    <div className="ev-info-content">
                      <span className="ev-info-label">Package</span>
                      <span className="ev-info-value ev-package">{experience.package}</span>
                    </div>
                  </div>
                )}
                
                <div className="ev-info-card">
                  <div className="ev-info-icon">⏱️</div>
                  <div className="ev-info-content">
                    <span className="ev-info-label">Prep Time</span>
                    <span className="ev-info-value">{experience.preparationTime}</span>
                  </div>
                </div>
                
                {experience.interviewMonth && experience.interviewYear && (
                  <div className="ev-info-card">
                    <div className="ev-info-icon">🗓️</div>
                    <div className="ev-info-content">
                      <span className="ev-info-label">Interview Date</span>
                      <span className="ev-info-value">{experience.interviewMonth} {experience.interviewYear}</span>
                    </div>
                  </div>
                )}
                
                <div className="ev-info-card">
                  <div className="ev-info-icon">🔄</div>
                  <div className="ev-info-content">
                    <span className="ev-info-label">Number of Rounds</span>
                    <span className="ev-info-value">{experience.rounds}</span>
                  </div>
                </div>
                
                {experience.resumeLink && (
                  <div className="ev-info-card">
                    <div className="ev-info-icon">📄</div>
                    <div className="ev-info-content">
                      <span className="ev-info-label">Resume</span>
                      <a href={experience.resumeLink} target="_blank" rel="noopener noreferrer" className="ev-info-link">
                        View Resume
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Tags */}
              {experience.tags && experience.tags.length > 0 && (
                <div className="ev-tags-section">
                  <h3>🏷️ Tags</h3>
                  <div className="ev-tags">
                    {experience.tags.map(tag => (
                      <span key={tag} className="ev-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interview Rounds Section */}
          {activeSection === 'rounds' && (
            <div className="ev-section" key="rounds">
              <div className="ev-section-header">
                <h2>🎯 Interview Rounds</h2>
                <p>Detailed breakdown of each interview round</p>
              </div>
              
              {experience.roundDetails && experience.roundDetails.length > 0 ? (
                <div className="ev-rounds-container">
                  {experience.roundDetails.map((round, index) => (
                    <div key={round.id || index} className="ev-round-card">
                      <div className="ev-round-header">
                        <div className="ev-round-number">Round {index + 1}</div>
                        <div className="ev-round-title">
                          <h4>{round.title}</h4>
                          <span className={`ev-round-type ${round.type}`}>{round.type}</span>
                        </div>
                        <div className={`ev-round-outcome ${round.outcome}`}>
                          {round.outcome}
                        </div>
                      </div>
                      
                      <div className="ev-round-details">
                        <div className="ev-round-meta">
                          <span><strong>Mode:</strong> {round.mode}</span>
                          {round.duration && <span><strong>Duration:</strong> {round.duration}</span>}
                        </div>
                        
                        <div className="ev-round-content">
                          <div className="ev-round-questions">
                            <h5>Questions Asked</h5>
                            <p>{round.questionsAsked}</p>
                          </div>
                          
                          {round.yourResponse && (
                            <div className="ev-round-response">
                              <h5>Response & Approach</h5>
                              <p>{round.yourResponse}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ev-empty-state">
                  <div className="ev-empty-icon">📝</div>
                  <h3>No Round Details Available</h3>
                  <p>The author hasn't provided detailed round-wise information.</p>
                </div>
              )}
            </div>
          )}

          {/* Preparation Section */}
          {activeSection === 'preparation' && (
            <div className="ev-section" key="preparation">
              <div className="ev-section-header">
                <h2>📚 Preparation Strategy</h2>
                <p>How the candidate prepared for this interview</p>
              </div>
              
              <div className="ev-content-card">
                <div className="ev-content-icon">🎯</div>
                <div className="ev-content-body">
                  <h3>Preparation Approach</h3>
                  <p>{experience.preparationStrategy || 'No preparation strategy provided.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Insights Section */}
          {activeSection === 'insights' && (
            <div className="ev-section" key="insights">
              <div className="ev-section-header">
                <h2>💡 Insights & Tips</h2>
                <p>Valuable advice and learnings from this experience</p>
              </div>
              
              <div className="ev-insights-grid">
                <div className="ev-content-card">
                  <div className="ev-content-icon">🎓</div>
                  <div className="ev-content-body">
                    <h3>Tips for Juniors</h3>
                    <p>{experience.tipsForJuniors || 'No tips provided.'}</p>
                  </div>
                </div>
                
                <div className="ev-content-card">
                  <div className="ev-content-icon">🔄</div>
                  <div className="ev-content-body">
                    <h3>What Would You Do Differently?</h3>
                    <p>{experience.whatToDoDifferently || 'No additional insights provided.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceView; 
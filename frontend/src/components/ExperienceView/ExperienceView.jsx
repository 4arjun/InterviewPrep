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

  useEffect(() => {
    const loadExperience = () => {
      setLoading(true);
      try {
        // Get experiences from localStorage
        const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
        const foundExperience = experiences.find(exp => exp.id === parseInt(id));
        
        if (foundExperience) {
          setExperience(foundExperience);
          setViews(foundExperience.views + 1);
          
          // Update views in localStorage
          const updatedExperiences = experiences.map(exp => 
            exp.id === parseInt(id) 
              ? { ...exp, views: exp.views + 1 }
              : exp
          );
          localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
        } else {
          // If not found in saved experiences, check mock data
          const mockExperiences = [
            {
              id: 1,
              company: 'Google',
              role: 'Software Engineer',
              college: 'IIT Delhi',
              year: 2024,
              offerType: 'on-campus',
              author: 'Rahul Sharma',
              isAnonymous: false,
              date: '2024-03-15',
              views: 245,
              likes: 45,
              difficulty: 'Hard',
              tags: ['DSA-heavy', 'System Design', 'Behavioral'],
              rounds: 4,
              finalOutcome: 'selected',
              package: '45 LPA',
              summary: 'Google SDE interview process with focus on algorithms, system design, and behavioral questions. Got selected with a great package!',
              preparationTime: '3+ months'
            },
            // ... other mock experiences
          ];
          
          const mockExperience = mockExperiences.find(exp => exp.id === parseInt(id));
          if (mockExperience) {
            setExperience(mockExperience);
            setViews(mockExperience.views);
          } else {
            navigate('/explore'); // Redirect if experience not found
          }
        }
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

    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const updatedExperiences = experiences.map(exp => {
      if (exp.id === experience.id) {
        const newLikes = liked ? exp.likes - 1 : exp.likes + 1;
        return { ...exp, likes: newLikes };
      }
      return exp;
    });

    localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
    setExperience(prev => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1
    }));
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="experience-view-container">
        <div className="loading-state">
          <h2>Loading experience...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="experience-view-container">
        <div className="not-found">
          <h2>Experience not found</h2>
          <Link to="/explore" className="back-btn">Back to Explore</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="experience-view-container">
      {/* Header with Navigation */}
      <div className="experience-header">
        <Link to="/explore" className="back-link">← Back to Explore</Link>
        <div className="header-content">
          <div className="company-role">
            <h1>{experience.company}</h1>
            <h2>{experience.role}</h2>
          </div>
          <div className="outcome-badge">
            <span className={`outcome ${experience.finalOutcome}`}>
              {experience.finalOutcome === 'selected' ? '✅ Selected' : 
               experience.finalOutcome === 'rejected' ? '❌ Rejected' : '⏳ Waiting'}
            </span>
          </div>
        </div>
      </div>

      <div className="experience-content">
        {/* Main Content */}
        <div className="main-content">
          {/* Quick Info Cards */}
          <div className="quick-info-cards">
            <div className="info-card">
              <span className="icon">🎓</span>
              <div className="info">
                <span className="label">College</span>
                <span className="value">{experience.college}</span>
              </div>
            </div>
            <div className="info-card">
              <span className="icon">📅</span>
              <div className="info">
                <span className="label">Year</span>
                <span className="value">{experience.year}</span>
              </div>
            </div>
            <div className="info-card">
              <span className="icon">🎯</span>
              <div className="info">
                <span className="label">Offer Type</span>
                <span className="value">{experience.offerType}</span>
              </div>
            </div>
            <div className="info-card">
              <span className="icon">⚡</span>
              <div className="info">
                <span className="label">Difficulty</span>
                <span className={`value difficulty ${experience.difficulty.toLowerCase()}`}>
                  {experience.difficulty}
                </span>
              </div>
            </div>
            {experience.package && experience.package !== 'N/A' && (
              <div className="info-card">
                <span className="icon">💰</span>
                <div className="info">
                  <span className="label">Package</span>
                  <span className="value package">{experience.package}</span>
                </div>
              </div>
            )}
            <div className="info-card">
              <span className="icon">⏱️</span>
              <div className="info">
                <span className="label">Prep Time</span>
                <span className="value">{experience.preparationTime}</span>
              </div>
            </div>
          </div>

          {/* Experience Summary */}
          <section className="content-section">
            <div className="section-header">
              <h3>Experience Summary</h3>
            </div>
            <div className="section-content">
              <p>{experience.summary}</p>
            </div>
          </section>

          {/* Interview Rounds */}
          {experience.roundDetails && (
            <section className="content-section">
              <div className="section-header">
                <h3>Interview Rounds</h3>
                <span className="round-count">{experience.roundDetails.length} Rounds</span>
              </div>
              <div className="section-content">
                <div className="rounds-container">
                  {experience.roundDetails.map((round, index) => (
                    <div key={round.id} className="round-card">
                      <div className="round-header">
                        <div className="round-title">
                          <span className="round-number">Round {index + 1}</span>
                          <h4>{round.title}</h4>
                        </div>
                        <span className={`round-type ${round.type}`}>{round.type}</span>
                      </div>
                      <div className="round-details">
                        <div className="detail-item">
                          <span className="icon">💻</span>
                          <span className="label">Mode:</span>
                          <span className="value">{round.mode}</span>
                        </div>
                        {round.duration && (
                          <div className="detail-item">
                            <span className="icon">⏱️</span>
                            <span className="label">Duration:</span>
                            <span className="value">{round.duration}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="icon">🎯</span>
                          <span className="label">Outcome:</span>
                          <span className={`value ${round.outcome}`}>{round.outcome}</span>
                        </div>
                      </div>
                      <div className="round-content">
                        <div className="questions">
                          <h5>Questions Asked</h5>
                          <p>{round.questionsAsked}</p>
                        </div>
                        {round.yourResponse && (
                          <div className="response">
                            <h5>Your Response</h5>
                            <p>{round.yourResponse}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Preparation Strategy */}
          <section className="content-section">
            <div className="section-header">
              <h3>Preparation Strategy</h3>
            </div>
            <div className="section-content">
              <p>{experience.preparationStrategy}</p>
            </div>
          </section>

          {/* Tips for Juniors */}
          {experience.tipsForJuniors && (
            <section className="content-section">
              <div className="section-header">
                <h3>Tips for Juniors</h3>
              </div>
              <div className="section-content">
                <p>{experience.tipsForJuniors}</p>
              </div>
            </section>
          )}

          {/* What to Do Differently */}
          {experience.whatToDoDifferently && (
            <section className="content-section">
              <div className="section-header">
                <h3>What Would You Do Differently?</h3>
              </div>
              <div className="section-content">
                <p>{experience.whatToDoDifferently}</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Author Info */}
          <div className="sidebar-card author-card">
            <div className="card-header">
              <h4>Shared by</h4>
            </div>
            <div className="card-content">
              <div className="author-info">
                <span className="icon">👤</span>
                <div className="info">
                  <p className="author">{experience.isAnonymous ? 'Anonymous' : experience.author}</p>
                  <p className="date">{new Date(experience.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="sidebar-card tags-card">
            <div className="card-header">
              <h4>Tags</h4>
            </div>
            <div className="card-content">
              <div className="tags">
                {experience.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="sidebar-card engagement-card">
            <div className="card-header">
              <h4>Engagement</h4>
            </div>
            <div className="card-content">
              <div className="engagement-stats">
                <div className="stat">
                  <span className="icon">👁️</span>
                  <div className="info">
                    <span className="label">Views</span>
                    <span className="count">{views}</span>
                  </div>
                </div>
                <button 
                  className={`like-btn ${liked ? 'liked' : ''}`}
                  onClick={handleLike}
                >
                  <span className="icon">❤️</span>
                  <div className="info">
                    <span className="label">Likes</span>
                    <span className="count">{experience.likes}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceView; 
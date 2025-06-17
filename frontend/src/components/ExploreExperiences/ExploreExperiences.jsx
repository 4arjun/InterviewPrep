import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import './ExploreExperiences.css';

const AnimatedIcon = ({ icon, delay }) => (
  <span className="ee-animated-icon" style={{ animationDelay: `${delay}s` }}>{icon}</span>
);

const ExperienceCard = ({ experience, onClick, expanded, onExpand }) => (
  <div className={`ee-card${expanded ? ' expanded' : ''}`} onClick={() => onClick(experience.id)}>
    <div className="ee-card-header">
      <div className="ee-company-logo">
        {experience.company ? experience.company[0] : '?'}
      </div>
      <div className="ee-card-title">
        <h3>{experience.company}</h3>
        <span className="ee-role">{experience.role}</span>
      </div>
      <div className={`ee-badge outcome ${experience.finalOutcome}`}>{
        experience.finalOutcome === 'selected' ? '✅ Selected' :
        experience.finalOutcome === 'rejected' ? '❌ Rejected' : '⏳ Waiting'
      }</div>
    </div>
    <div className="ee-card-meta">
      <span className="ee-meta-item"><i className="ee-icon">🎓</i> {experience.college}</span>
      <span className="ee-meta-item"><i className="ee-icon">📅</i> {experience.year}</span>
      <span className="ee-meta-item"><i className="ee-icon">🏷️</i> {experience.offerType}</span>
      <span className="ee-meta-item"><i className="ee-icon">💰</i> {experience.package}</span>
      <span className="ee-meta-item"><i className="ee-icon">⭐</i> {experience.difficulty}</span>
      <span className="ee-meta-item"><i className="ee-icon">🔄</i> {experience.rounds} Rounds</span>
      <span className="ee-meta-item"><i className="ee-icon">⏱️</i> {experience.preparationTime}</span>
    </div>
    <div className="ee-card-summary">{experience.summary}</div>
    <div className="ee-card-tags">
      {experience.tags.map(tag => (
        <span className="ee-tag" key={tag}>{tag}</span>
      ))}
    </div>
    <div className="ee-card-footer">
      <div className="ee-author">
        <span className="ee-avatar">{experience.isAnonymous ? 'A' : (experience.author?.[0] || '?')}</span>
        <span className="ee-author-name">{experience.isAnonymous ? 'Anonymous' : experience.author}</span>
        <span className="ee-date">{new Date(experience.date).toLocaleDateString()}</span>
      </div>
      <div className="ee-engagement">
        <span className="ee-views">👁️ {experience.views}</span>
        <span className="ee-likes">❤️ {experience.likes}</span>
      </div>
    </div>
    <button className="ee-expand-btn" onClick={e => { e.stopPropagation(); onExpand(experience.id); }}>
      {expanded ? 'Show Less ▲' : 'Preview ▼'}
    </button>
    <div className={`ee-card-details${expanded ? ' show' : ''}`}>{expanded && (
      <div>
        <div className="ee-details-section">
          <h4>Preparation Strategy</h4>
          <p>{experience.preparationStrategy}</p>
        </div>
        <div className="ee-details-section">
          <h4>Tips for Juniors</h4>
          <p>{experience.tipsForJuniors || 'No tips provided'}</p>
        </div>
        <button className="ee-view-full-btn" onClick={e => { e.stopPropagation(); onClick(experience.id); }}>
          View Full Experience →
        </button>
      </div>
    )}</div>
  </div>
);

const ExploreExperiences = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    company: '',
    role: '',
    college: '',
    year: '',
    offerType: '',
    tags: '',
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Fetch experiences from backend
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://app-4510091842.europe-west1.run.app/api/experiences/');
        if (!response.ok) throw new Error('Failed to fetch experiences');
        const data = await response.json();
        const mapped = data.map(exp => ({
          id: exp.id,
          company: exp.company,
          role: exp.role,
          college: exp.college,
          year: exp.graduation_year,
          offerType: exp.interview_type,
          author: exp.author_name,
          isAnonymous: !exp.show_profile,
          date: exp.created_at,
          views: exp.views || 0,
          likes: exp.likes || 0,
          difficulty: exp.difficulty_rating,
          tags: exp.tags || [],
          rounds: exp.number_of_rounds,
          finalOutcome: exp.final_outcome,
          package: exp.offered_package,
          summary: exp.preparation_strategy?.slice(0, 120) + '...',
          preparationTime: exp.preparation_time,
          preparationStrategy: exp.preparation_strategy,
        }));
        setExperiences(mapped);
        setFilteredExperiences(mapped);
      } catch (error) {
        setExperiences([]);
        setFilteredExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, experiences]);

  const applyFilters = () => {
    let filtered = [...experiences];
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(exp =>
        exp.company.toLowerCase().includes(searchTerm) ||
        exp.role.toLowerCase().includes(searchTerm) ||
        exp.college.toLowerCase().includes(searchTerm) ||
        exp.summary.toLowerCase().includes(searchTerm) ||
        exp.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    if (filters.company) {
      filtered = filtered.filter(exp => exp.company === filters.company);
    }
    if (filters.role) {
      filtered = filtered.filter(exp => exp.role.toLowerCase().includes(filters.role.toLowerCase()));
    }
    if (filters.college) {
      filtered = filtered.filter(exp => exp.college.toLowerCase().includes(filters.college.toLowerCase()));
    }
    if (filters.year) {
      filtered = filtered.filter(exp => exp.year.toString() === filters.year);
    }
    if (filters.offerType) {
      filtered = filtered.filter(exp => exp.offerType === filters.offerType);
    }
    if (filters.tags) {
      const selectedTags = filters.tags.toLowerCase();
      filtered = filtered.filter(exp =>
        exp.tags.some(tag => tag.toLowerCase().includes(selectedTags))
      );
    }
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    setFilteredExperiences(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '', company: '', role: '', college: '', year: '', offerType: '', tags: '', sortBy: 'newest'
    });
  };

  const getUniqueValues = (field) => {
    return [...new Set(experiences.map(exp => exp[field]))].filter(Boolean);
  };

  const handleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleCardClick = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  return (
    <div className="ee-container">
      {/* Animated Background */}
      <div className="ee-bg-animation"></div>
      
      {/* Header Section */}
      <div className="ee-header">
        <Link to="/dashboard" className="ee-back-link">
          <span className="icon">←</span>
          Back to Dashboard
        </Link>
        
        <div className="ee-hero">
          <div className="ee-hero-bg">
            <AnimatedIcon icon="💡" delay={0} />
            <AnimatedIcon icon="🚀" delay={0.2} />
            <AnimatedIcon icon="🎯" delay={0.4} />
            <AnimatedIcon icon="🏆" delay={0.6} />
          </div>
          <div className="ee-hero-content">
            <h1>Explore Interview Experiences</h1>
            <p>Real stories, real strategies. Get inspired and prepare smarter!</p>
            <Link to="/share" className="ee-cta-btn">+ Share Your Experience</Link>
          </div>
        </div>
        
        <div className="ee-filters-bar">
          <input 
            type="text" 
            placeholder="Search experiences..." 
            className="ee-search-input"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
          <button className="ee-filters-toggle" onClick={() => setShowFilters(v => !v)}>
            {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </button>
          <div className="ee-sort-select">
            <label>Sort by:</label>
            <select value={filters.sortBy} onChange={e => handleFilterChange('sortBy', e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-liked">Most Liked</option>
              <option value="most-viewed">Most Viewed</option>
            </select>
          </div>
        </div>
        
        {showFilters && (
          <div className="ee-filters-panel animate-in">
            <div className="ee-filters-grid">
              <div className="ee-filter-group">
                <label>Company</label>
                <select value={filters.company} onChange={e => handleFilterChange('company', e.target.value)}>
                  <option value="">All</option>
                  {getUniqueValues('company').map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              <div className="ee-filter-group">
                <label>Role</label>
                <input type="text" value={filters.role} onChange={e => handleFilterChange('role', e.target.value)} placeholder="e.g. SDE" />
              </div>
              <div className="ee-filter-group">
                <label>College</label>
                <input type="text" value={filters.college} onChange={e => handleFilterChange('college', e.target.value)} placeholder="e.g. IIT" />
              </div>
              <div className="ee-filter-group">
                <label>Year</label>
                <select value={filters.year} onChange={e => handleFilterChange('year', e.target.value)}>
                  <option value="">All</option>
                  {getUniqueValues('year').map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="ee-filter-group">
                <label>Offer Type</label>
                <select value={filters.offerType} onChange={e => handleFilterChange('offerType', e.target.value)}>
                  <option value="">All</option>
                  <option value="on-campus">On-campus</option>
                  <option value="off-campus">Off-campus</option>
                  <option value="referral">Referral</option>
                  <option value="ppo">PPO</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div className="ee-filter-group">
                <label>Tags</label>
                <input type="text" value={filters.tags} onChange={e => handleFilterChange('tags', e.target.value)} placeholder="e.g. DSA, System Design" />
              </div>
            </div>
            <div className="ee-filter-actions">
              <button className="ee-clear-btn" onClick={clearFilters}>Clear All</button>
              <span className="ee-results-count">{filteredExperiences.length} found</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="ee-main">
        <div className="ee-cards-grid">
          {loading ? (
            <div className="ee-loading">
              <div className="ee-spinner"></div>
              <span>Loading experiences...</span>
            </div>
          ) : filteredExperiences.length === 0 ? (
            <div className="ee-no-results animate-in">
              <div className="ee-no-results-illustration">😕</div>
              <h3>No experiences found</h3>
              <p>Try different filters or search terms.</p>
              <button className="ee-clear-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            filteredExperiences.map((exp, idx) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                expanded={exp.id === expandedId}
                onExpand={handleExpand}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreExperiences; 
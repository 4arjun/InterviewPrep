import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import './ExploreExperiences.css';

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

  // Mock data for demonstration
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
    {
      id: 2,
      company: 'Microsoft',
      role: 'Product Manager',
      college: 'IIT Bombay',
      year: 2024,
      offerType: 'off-campus',
      author: 'Anonymous',
      isAnonymous: true,
      date: '2024-03-10',
      views: 189,
      likes: 32,
      difficulty: 'Medium',
      tags: ['Case Study', 'Behavioral', 'Product Sense'],
      rounds: 3,
      finalOutcome: 'selected',
      package: '38 LPA',
      summary: 'Microsoft PM role interview focusing on product thinking, case studies, and leadership scenarios.',
      preparationTime: '1-3 months'
    },
    {
      id: 3,
      company: 'Amazon',
      role: 'SDE Intern',
      college: 'BITS Pilani',
      year: 2024,
      offerType: 'on-campus',
      author: 'Priya Patel',
      isAnonymous: false,
      date: '2024-03-08',
      views: 156,
      likes: 28,
      difficulty: 'Medium',
      tags: ['DSA-heavy', 'Leadership Principles', 'Coding Round'],
      rounds: 3,
      finalOutcome: 'selected',
      package: '1.2L/month',
      summary: 'Amazon SDE internship interview with heavy focus on DSA and Amazon Leadership Principles.',
      preparationTime: '1-3 months'
    },
    {
      id: 4,
      company: 'Tesla',
      role: 'Software Engineer',
      college: 'NIT Trichy',
      year: 2024,
      offerType: 'off-campus',
      author: 'Anonymous',
      isAnonymous: true,
      date: '2024-03-05',
      views: 234,
      likes: 56,
      difficulty: 'Hard',
      tags: ['System Design', 'Behavioral', 'Technical Round'],
      rounds: 5,
      finalOutcome: 'selected',
      package: '52 LPA',
      summary: 'Tesla software engineer interview with emphasis on system design and innovative thinking.',
      preparationTime: '3+ months'
    },
    {
      id: 5,
      company: 'Meta',
      role: 'Data Scientist',
      college: 'IIT Madras',
      year: 2024,
      offerType: 'referral',
      author: 'Arjun Kumar',
      isAnonymous: false,
      date: '2024-03-01',
      views: 198,
      likes: 41,
      difficulty: 'Hard',
      tags: ['ML/AI', 'Statistics', 'Case Study'],
      rounds: 4,
      finalOutcome: 'rejected',
      package: 'N/A',
      summary: 'Meta Data Scientist interview with focus on ML algorithms, statistics, and product analytics.',
      preparationTime: '3+ months'
    },
    {
      id: 6,
      company: 'Netflix',
      role: 'Frontend Developer',
      college: 'IIIT Hyderabad',
      year: 2024,
      offerType: 'off-campus',
      author: 'Sneha Reddy',
      isAnonymous: false,
      date: '2024-02-28',
      views: 167,
      likes: 35,
      difficulty: 'Medium',
      tags: ['Frontend', 'React', 'System Design'],
      rounds: 3,
      finalOutcome: 'selected',
      package: '42 LPA',
      summary: 'Netflix frontend developer interview focusing on React, JavaScript fundamentals, and frontend system design.',
      preparationTime: '1-3 months'
    }
  ];

  useEffect(() => {
    // Load experiences from localStorage
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        // Get experiences from localStorage
        const savedExperiences = JSON.parse(localStorage.getItem('experiences') || '[]');
        
        // If no saved experiences, use mock data
        const experiencesToShow = savedExperiences.length > 0 ? savedExperiences : mockExperiences;
        
        setExperiences(experiencesToShow);
        setFilteredExperiences(experiencesToShow);
      } catch (error) {
        console.error('Error loading experiences:', error);
        // Fallback to mock data if there's an error
        setExperiences(mockExperiences);
        setFilteredExperiences(mockExperiences);
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

    // Search filter
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

    // Company filter
    if (filters.company) {
      filtered = filtered.filter(exp => exp.company === filters.company);
    }

    // Role filter
    if (filters.role) {
      filtered = filtered.filter(exp => exp.role.toLowerCase().includes(filters.role.toLowerCase()));
    }

    // College filter
    if (filters.college) {
      filtered = filtered.filter(exp => exp.college.toLowerCase().includes(filters.college.toLowerCase()));
    }

    // Year filter
    if (filters.year) {
      filtered = filtered.filter(exp => exp.year.toString() === filters.year);
    }

    // Offer Type filter
    if (filters.offerType) {
      filtered = filtered.filter(exp => exp.offerType === filters.offerType);
    }

    // Tags filter
    if (filters.tags) {
      const selectedTags = filters.tags.toLowerCase();
      filtered = filtered.filter(exp =>
        exp.tags.some(tag => tag.toLowerCase().includes(selectedTags))
      );
    }

    // Sorting
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
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      company: '',
      role: '',
      college: '',
      year: '',
      offerType: '',
      tags: '',
      sortBy: 'newest'
    });
  };

  const handleExperienceClick = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  const getUniqueValues = (field) => {
    return [...new Set(experiences.map(exp => exp[field]))].filter(Boolean);
  };

  if (loading) {
    return (
      <div className="explore-container">
        <div className="loading-state">
          <h2>Loading experiences...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-container">
      {/* Header */}
      <div className="explore-header">
        <div className="header-content">
          <h1>Explore Interview Experiences</h1>
          <p>Discover insights from {experiences.length} shared interview experiences</p>
        </div>
        <Link to="/share" className="share-btn">
          + Share Your Experience
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by company, role, college, or keywords..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="filter-controls">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle-btn"
          >
            Filters {showFilters ? '▲' : '▼'}
          </button>
          <div className="sort-control">
            <label>Sort by:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-liked">Most Liked</option>
              <option value="most-viewed">Most Viewed</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Company</label>
                <select
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                >
                  <option value="">All Companies</option>
                  {getUniqueValues('company').map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Role</label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>College</label>
                <input
                  type="text"
                  placeholder="e.g., IIT Delhi"
                  value={filters.college}
                  onChange={(e) => handleFilterChange('college', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  <option value="">All Years</option>
                  {getUniqueValues('year').map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Offer Type</label>
                <select
                  value={filters.offerType}
                  onChange={(e) => handleFilterChange('offerType', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="on-campus">On-campus</option>
                  <option value="off-campus">Off-campus</option>
                  <option value="referral">Referral</option>
                  <option value="ppo">PPO</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder="e.g., DSA-heavy, System Design"
                  value={filters.tags}
                  onChange={(e) => handleFilterChange('tags', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
              <span className="results-count">
                {filteredExperiences.length} experience{filteredExperiences.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="experiences-grid">
        {filteredExperiences.length === 0 ? (
          <div className="no-results">
            <h3>No experiences found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        ) : (
          filteredExperiences.map(experience => (
            <div
              key={experience.id}
              className="experience-card"
              onClick={() => handleExperienceClick(experience.id)}
            >
              <div className="card-header">
                <div className="company-role">
                  <h3>{experience.company}</h3>
                  <p className="role">{experience.role}</p>
                </div>
                <div className="outcome-badge">
                  <span className={`outcome ${experience.finalOutcome}`}>
                    {experience.finalOutcome === 'selected' ? '✅ Selected' : 
                     experience.finalOutcome === 'rejected' ? '❌ Rejected' : '⏳ Waiting'}
                  </span>
                </div>
              </div>

              <div className="card-content">
                <div className="experience-meta">
                  <span className="college">{experience.college}</span>
                  <span className="year">{experience.year}</span>
                  <span className="offer-type">{experience.offerType}</span>
                </div>

                <p className="summary">{experience.summary}</p>

                <div className="experience-details">
                  <div className="detail-item">
                    <span className="label">Rounds:</span>
                    <span className="value">{experience.rounds}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Difficulty:</span>
                    <span className={`value difficulty ${experience.difficulty.toLowerCase()}`}>
                      {experience.difficulty}
                    </span>
                  </div>
                  {experience.package !== 'N/A' && (
                    <div className="detail-item">
                      <span className="label">Package:</span>
                      <span className="value package">{experience.package}</span>
                    </div>
                  )}
                </div>

                <div className="tags">
                  {experience.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                  {experience.tags.length > 3 && (
                    <span className="more-tags">+{experience.tags.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="card-footer">
                <div className="author-info">
                  <span className="author">
                    By {experience.isAnonymous ? 'Anonymous' : experience.author}
                  </span>
                  <span className="date">
                    {new Date(experience.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="engagement">
                  <span className="views">👁️ {experience.views}</span>
                  <span className="likes">❤️ {experience.likes}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button (if needed for pagination) */}
      {filteredExperiences.length > 0 && filteredExperiences.length >= 6 && (
        <div className="load-more-section">
          <button className="load-more-btn">Load More Experiences</button>
        </div>
      )}
    </div>
  );
};

export default ExploreExperiences; 
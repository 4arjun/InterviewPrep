import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import Layout from '../Layout/Layout';
import './Dashboard.css';
import {
  FiCheckCircle, FiCircle, FiTarget, FiTrendingUp, FiBarChart2, FiBookmark,
  FiEdit, FiCopy, FiFileText, FiExternalLink, FiSettings, FiLogOut, FiUser,
  FiBell, FiSearch, FiMenu, FiX, FiFilter, FiAward, FiTrendingDown
} from 'react-icons/fi';
import { FaCode } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

// Custom LeetCode Icon Component
const LeetCodeIcon = ({ className }) => (
  <SiLeetcode className={className} />
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [showOnlyRevision, setShowOnlyRevision] = useState(false);
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample curated DSA questions - replace with your 150 questions
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      isMarkedForRevision: false,
      isDone: true,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      articleUrl: "/articles/two-sum"
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      isMarkedForRevision: true,
      isDone: false,
      note: "Review linked list implementation",
      leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
      articleUrl: "/articles/add-two-numbers"
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      isMarkedForRevision: false,
      isDone: true,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      articleUrl: "/articles/longest-substring"
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      isMarkedForRevision: true,
      isDone: false,
      note: "Binary search approach needed",
      leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      articleUrl: "/articles/median-sorted-arrays"
    },
    {
      id: 5,
      title: "Valid Parentheses",
      difficulty: "Easy",
      isMarkedForRevision: false,
      isDone: true,
      note: "",
      leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
      articleUrl: "/articles/valid-parentheses"
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMarkAsDone = (questionId) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, isDone: !q.isDone } : q
    ));
  };

  const handleMarkForRevision = (questionId) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, isMarkedForRevision: !q.isMarkedForRevision } : q
    ));
  };

  const handleAddNote = (question) => {
    setSelectedQuestion(question);
    setShowNoteModal(true);
  };

  const handleSaveNote = (note) => {
    setQuestions(questions.map(q =>
      q.id === selectedQuestion.id ? { ...q, note } : q
    ));
    setShowNoteModal(false);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  // Filter and search logic
  let filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    const matchesRevision = !showOnlyRevision || q.isMarkedForRevision;
    const matchesUnsolved = !showOnlyUnsolved || !q.isDone;
    
    return matchesSearch && matchesDifficulty && matchesRevision && matchesUnsolved;
  });

  const getStats = () => {
    const total = questions.length;
    const completed = questions.filter(q => q.isDone).length;
    const easy = questions.filter(q => q.difficulty === "Easy" && q.isDone).length;
    const medium = questions.filter(q => q.difficulty === "Medium" && q.isDone).length;
    const hard = questions.filter(q => q.difficulty === "Hard" && q.isDone).length;
    const totalEasy = questions.filter(q => q.difficulty === "Easy").length;
    const totalMedium = questions.filter(q => q.difficulty === "Medium").length;
    const totalHard = questions.filter(q => q.difficulty === "Hard").length;
    const progressPercent = total ? Math.round((completed / total) * 100) : 0;
    
    return { 
      total, completed, easy, medium, hard, 
      totalEasy, totalMedium, totalHard, progressPercent 
    };
  };

  const stats = getStats();

  return (
    <Layout 
      title="Dashboard " 
      showSearch={true} 
      onSearch={setSearchQuery}
    >
      <div className="dashboard-content">
        {/* Enhanced Stats Section */}
        <section className="stats-section">
          <div className="stats-overview">
            <div className="main-progress-card">
              <div className="progress-header">
                <div className="progress-title">
                  <FiTarget className="title-icon" />
                  <div>
                    <h2>Overall Progress</h2>
                    <p>Keep pushing forward!</p>
                  </div>
                </div>
                <div className="progress-badge">
                  <FiAward />
                  <span>{stats.progressPercent}% Complete</span>
                </div>
              </div>
              
              <div className="progress-content">
                <div className="progress-stats">
                  <div className="stat-item">
                    <span className="stat-number">{stats.completed}</span>
                    <span className="stat-label">Solved</span>
                  </div>
                  <div className="stat-divider">/</div>
                  <div className="stat-item">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total</span>
                  </div>
                </div>
                
                <div className="circular-progress">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" className="progress-bg" />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      className="progress-fill"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 50}`,
                        strokeDashoffset: `${2 * Math.PI * 50 * (1 - stats.progressPercent / 100)}`
                      }}
                    />
                    <text x="60" y="65" className="progress-percentage">{stats.progressPercent}%</text>
                  </svg>
                </div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill-bar" 
                  style={{ width: `${stats.progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="difficulty-breakdown">
            <div className="difficulty-cards">
              <div className="diff-card easy">
                <div className="diff-header">
                  <div className="diff-icon">
                    <FiCheckCircle />
                  </div>
                  <div className="diff-info">
                    <span className="diff-label">Easy</span>
                    <span className="diff-count">{stats.easy}/{stats.totalEasy}</span>
                  </div>
                </div>
                <div className="diff-progress">
                  <div 
                    className="diff-progress-bar easy" 
                    style={{ width: `${stats.totalEasy ? (stats.easy / stats.totalEasy) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="diff-card medium">
                <div className="diff-header">
                  <div className="diff-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="diff-info">
                    <span className="diff-label">Medium</span>
                    <span className="diff-count">{stats.medium}/{stats.totalMedium}</span>
                  </div>
                </div>
                <div className="diff-progress">
                  <div 
                    className="diff-progress-bar medium" 
                    style={{ width: `${stats.totalMedium ? (stats.medium / stats.totalMedium) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="diff-card hard">
                <div className="diff-header">
                  <div className="diff-icon">
                    <FiTrendingDown />
                  </div>
                  <div className="diff-info">
                    <span className="diff-label">Hard</span>
                    <span className="diff-count">{stats.hard}/{stats.totalHard}</span>
                  </div>
                </div>
                <div className="diff-progress">
                  <div 
                    className="diff-progress-bar hard" 
                    style={{ width: `${stats.totalHard ? (stats.hard / stats.totalHard) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="filters-section">
          <div className="filter-group">
            <div className="difficulty-filters">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  className={`filter-btn ${filterDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setFilterDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
            
            <div className="toggle-filters">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showOnlyRevision}
                  onChange={(e) => setShowOnlyRevision(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">For Revision</span>
              </label>
              
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showOnlyUnsolved}
                  onChange={(e) => setShowOnlyUnsolved(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Unsolved Only</span>
              </label>
            </div>
          </div>
        </section>

        {/* Questions List */}
        <section className="questions-section">
          <div className="questions-header">
            <h3>Questions ({filteredQuestions.length})</h3>
          </div>
          
          <div className="questions-list">
            {filteredQuestions.map((question) => (
              <div key={question.id} className={`question-card ${question.isDone ? 'completed' : ''}`}>
                <div className="question-main">
                  <button
                    className="status-btn"
                    onClick={() => handleMarkAsDone(question.id)}
                  >
                    {question.isDone ? <FiCheckCircle /> : <FiCircle />}
                  </button>
                  
                  <div className="question-info">
                    <h4 className="question-title">{question.title}</h4>
                    <span className={`difficulty-tag ${question.difficulty.toLowerCase()}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  
                  <div className="question-actions">
                    <a href={question.articleUrl} className="action-btn" title="View Article">
                      <FiFileText />
                    </a>
                    <a href={question.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="action-btn leetcode-btn" title="Open in LeetCode">
                      <LeetCodeIcon />
                    </a>
                    <button className="action-btn" onClick={() => handleCopyLink(question.leetcodeUrl)} title="Copy Link">
                      <FiCopy />
                    </button>
                    <button className="action-btn" onClick={() => handleAddNote(question)} title="Add Note">
                      <FiEdit />
                    </button>
                    <button
                      className={`action-btn ${question.isMarkedForRevision ? 'active' : ''}`}
                      onClick={() => handleMarkForRevision(question.id)}
                      title="Mark for Revision"
                    >
                      <FiBookmark />
                    </button>
                  </div>
                </div>
                
                {question.note && (
                  <div className="question-note">
                    <span className="note-text">{question.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Note</h3>
              <button className="close-btn" onClick={() => setShowNoteModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <textarea
                placeholder="Add your notes here..."
                defaultValue={selectedQuestion?.note}
                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, note: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowNoteModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => handleSaveNote(selectedQuestion.note)}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard; 
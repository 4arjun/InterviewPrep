import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <Link to="/dashboard" className="logo">LeetCode Tracker</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search companies, roles, questions..." />
          </div>
        </div>
        <div className="nav-right">
          <button className="notification-btn">🔔</button>
          <div className="profile-dropdown">
            <img src="https://via.placeholder.com/40" alt="Profile" className="avatar" />
            <div className="dropdown-content">
              <Link to="/profile">My Profile</Link>
              <Link to="/profile">Saved Experiences</Link>
              <Link to="/settings">Settings</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="sidebar-link active">Dashboard</Link>
            <Link to="/explore" className="sidebar-link">Explore Experiences</Link>
            <Link to="/share" className="sidebar-link">Share Experience</Link>
            <Link to="/profile" className="sidebar-link">My Contributions</Link>
            <Link to="/profile" className="sidebar-link">Saved Posts</Link>
            <Link to="/analytics" className="sidebar-link">Analytics/Insights</Link>
            <Link to="/settings" className="sidebar-link">Settings</Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h1>Hi {user?.name || 'User'}, ready to help someone today?</h1>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Experiences Shared</h3>
                <p>12</p>
              </div>
              <div className="stat-card">
                <h3>Likes Received</h3>
                <p>156</p>
              </div>
              <div className="stat-card">
                <h3>Most Viewed Post</h3>
                <p>Google SDE Interview</p>
              </div>
              <div className="stat-card">
                <h3>Community Level</h3>
                <p>Contributor</p>
              </div>
            </div>
          </section>

          {/* Quick Action Cards */}
          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <Link to="/share" className="action-card">
                <span>🔄</span>
                <h3>Share Experience</h3>
              </Link>
              <Link to="/explore" className="action-card">
                <span>🔍</span>
                <h3>Explore Questions</h3>
              </Link>
              <div className="action-card">
                <span>🧠</span>
                <h3>Mock Interview</h3>
              </div>
              <Link to="/analytics" className="action-card">
                <span>📊</span>
                <h3>Career Insights</h3>
              </Link>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="recent-activity">
            <h2>Your Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <h3>Google SDE Interview Experience</h3>
                <div className="activity-stats">
                  <span>👁️ 245 views</span>
                  <span>❤️ 45 likes</span>
                </div>
                <div className="activity-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
              <div className="activity-item">
                <h3>Microsoft PM Interview</h3>
                <div className="activity-stats">
                  <span>👁️ 189 views</span>
                  <span>❤️ 32 likes</span>
                </div>
                <div className="activity-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
              <div className="activity-item">
                <h3>Amazon SDE Internship</h3>
                <div className="activity-stats">
                  <span>👁️ 156 views</span>
                  <span>❤️ 28 likes</span>
                </div>
                <div className="activity-actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            </div>
          </section>

          {/* Personalized Feed */}
          <section className="personalized-feed">
            <h2>Recommended for You</h2>
            <div className="feed-list">
              <div className="feed-item">
                <div className="feed-header">
                  <h3>Tesla Software Engineer Interview</h3>
                  <span className="company-tag">Tesla</span>
                </div>
                <p>Detailed breakdown of Tesla's software engineering interview process...</p>
                <div className="feed-meta">
                  <span>By Anonymous • 2 days ago</span>
                  <span>👁️ 89 views</span>
                </div>
              </div>
              <div className="feed-item">
                <div className="feed-header">
                  <h3>Netflix Product Manager Role</h3>
                  <span className="company-tag">Netflix</span>
                </div>
                <p>Experience sharing for Netflix PM position with case studies...</p>
                <div className="feed-meta">
                  <span>By John D. • 1 week ago</span>
                  <span>👁️ 234 views</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 
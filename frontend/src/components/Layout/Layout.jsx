import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import Sidebar from '../Sidebar/Sidebar';
import { FiMenu, FiLogOut, FiSearch } from 'react-icons/fi';
import { FaCode } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ children, title = "DSA Tracker", showSearch = false, onSearch }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="layout-content">
        {/* Header */}
        <header className="layout-header">
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <div className="logo">
              <FaCode />
              <span>{title}</span>
            </div>
            {showSearch && (
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
            )}
          </div>
          <div className="header-right">
            <button className="icon-btn" onClick={handleLogout}>
              <FiLogOut />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 
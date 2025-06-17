import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  FiHome, FiBarChart2, FiUsers, FiShare2, FiSettings, FiLogOut,
  FiMenu, FiX, FiUser, FiHelpCircle, FiTrendingUp, FiBookOpen
} from 'react-icons/fi';
import { FaCode } from 'react-icons/fa';

const Sidebar = ({ isOpen, onToggle, onLogout }) => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/dashboard',
      icon: FiBarChart2,
      label: 'Dashboard',
      description: 'Track your progress'
    },
    {
      path: '/explore',
      icon: FiTrendingUp,
      label: 'Explore Experiences',
      description: 'Browse shared experiences'
    },
    {
      path: '/share',
      icon: FiShare2,
      label: 'Share Experience',
      description: 'Share your journey'
    },
    {
      path: '/profile',
      icon: FiUser,
      label: 'Profile',
      description: 'Manage your profile'
    },
    {
      path: '/settings',
      icon: FiSettings,
      label: 'Settings',
      description: 'App preferences'
    },
    {
      path: '/faq',
      icon: FiHelpCircle,
      label: 'FAQ',
      description: 'Get help'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle}></div>}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaCode className="logo-icon" />
            <span className="logo-text">InterviewPrep</span>
          </div>
          <button className="sidebar-close-btn" onClick={onToggle}>
            <FiX />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-section-title">Main</h4>
            {navigationItems.slice(0, 2).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? 'nav-item-active' : ''}`}
                  onClick={onToggle}
                >
                  <div className="nav-item-icon">
                    <IconComponent />
                  </div>
                  <div className="nav-item-content">
                    <span className="nav-item-label">{item.label}</span>
                    <span className="nav-item-description">{item.description}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="nav-section">
            <h4 className="nav-section-title">Community</h4>
            {navigationItems.slice(2, 4).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? 'nav-item-active' : ''}`}
                  onClick={onToggle}
                >
                  <div className="nav-item-icon">
                    <IconComponent />
                  </div>
                  <div className="nav-item-content">
                    <span className="nav-item-label">{item.label}</span>
                    <span className="nav-item-description">{item.description}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="nav-section">
            <h4 className="nav-section-title">Account</h4>
            {navigationItems.slice(4).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? 'nav-item-active' : ''}`}
                  onClick={onToggle}
                >
                  <div className="nav-item-icon">
                    <IconComponent />
                  </div>
                  <div className="nav-item-content">
                    <span className="nav-item-label">{item.label}</span>
                    <span className="nav-item-description">{item.description}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 
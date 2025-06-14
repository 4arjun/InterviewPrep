import { useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Components
import Landing from './components/Landing/Landing'
import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard'
import ShareExperience from './components/ShareExperience/ShareExperience'
import ExploreExperiences from './components/ExploreExperiences/ExploreExperiences'
import ExperienceView from './components/ExperienceView/ExperienceView'
import UserProfile from './components/UserProfile/UserProfile'
import Analytics from './components/Analytics/Analytics'
import Contact from './components/Contact/Contact'
import FAQ from './components/FAQ/FAQ'
import Settings from './components/Settings/Settings'
import AdminPanel from './components/AdminPanel/AdminPanel'
import NotFound from './components/NotFound/NotFound'

import './App.css'

// Auth Context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth" />
}

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  return isAuthenticated && user?.role === 'admin' ? children : <Navigate to="/dashboard" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/share" element={
              <ProtectedRoute>
                <ShareExperience />
              </ProtectedRoute>
            } />
            
            <Route path="/explore" element={
              <ProtectedRoute>
                <ExploreExperiences />
              </ProtectedRoute>
            } />
            
            <Route path="/experience/:id" element={
              <ProtectedRoute>
                <ExperienceView />
              </ProtectedRoute>
            } />
            
            <Route path="/profile/:id?" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
      </Router>
    </AuthProvider>
  )
}

export default App

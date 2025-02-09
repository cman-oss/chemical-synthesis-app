import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Pages (we'll create these next)
import Welcome from './pages/Welcome'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Pricing from './pages/Pricing'
import NewProject from './pages/projects/NewProject'
import Subscribe from './pages/Subscribe'
import Project from './pages/projects/Project'

// Auth context (we'll create this next)
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router basename="/chemical-synthesis-app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Add new protected route */}
            <Route path="/projects/new" element={
              <ProtectedRoute>
                <NewProject />
              </ProtectedRoute>
            } />
            
            <Route path="/subscribe/:plan" element={
              <ProtectedRoute>
                <Subscribe />
              </ProtectedRoute>
            } />
            
            <Route path="/projects/:projectId" element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App

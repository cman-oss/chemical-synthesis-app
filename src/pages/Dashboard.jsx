import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import '../styles/Dashboard.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const { subscription } = useSubscription()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch user's projects
    const fetchProjects = async () => {
      try {
        // TODO: Replace with actual API call
        const mockProjects = [
          {
            id: '1',
            title: 'Aspirin Synthesis',
            targetCompound: 'C9H8O4',
            status: 'completed',
            confidence: 0.95,
            createdAt: '2024-03-10'
          },
          {
            id: '2',
            title: 'Paracetamol Production',
            targetCompound: 'C8H9NO2',
            status: 'in_progress',
            confidence: 0.88,
            createdAt: '2024-03-15'
          }
        ]
        setProjects(mockProjects)
        setLoading(false)
      } catch (error) {
        setError('Failed to load projects')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleCreateProject = () => {
    if (projects.length >= subscription?.projectLimit) {
      navigate('/pricing')
      return
    }
    navigate('/projects/new')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {user?.displayName}</h1>
          <span className="plan-badge">{subscription?.tier || 'Free'} Plan</span>
        </div>
        <div className="header-right">
          <button 
            className="create-project-button"
            onClick={handleCreateProject}
          >
            New Project
          </button>
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🧪</div>
          <div className="stat-content">
            <h3>{projects.length}</h3>
            <p>Active Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{subscription?.projectLimit - projects.length}</h3>
            <p>Projects Remaining</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>{projects.filter(p => p.status === 'completed').length}</h3>
            <p>Completed Syntheses</p>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <div className="section-header">
          <h2>Your Projects</h2>
          <div className="project-filters">
            <select defaultValue="all">
              <option value="all">All Projects</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="project-card"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className={`status-badge ${project.status}`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="project-details">
                  <p className="compound">
                    <span className="label">Target Compound:</span>
                    <span className="value">{project.targetCompound}</span>
                  </p>
                  {project.confidence && (
                    <p className="confidence">
                      <span className="label">Confidence:</span>
                      <span className="value">{(project.confidence * 100).toFixed(1)}%</span>
                    </p>
                  )}
                  <p className="date">
                    <span className="label">Created:</span>
                    <span className="value">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            {projects.length < subscription?.projectLimit && (
              <div 
                className="project-card new-project"
                onClick={handleCreateProject}
              >
                <div className="new-project-content">
                  <span className="plus-icon">+</span>
                  <p>Create New Project</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {projects.length >= subscription?.projectLimit && (
        <div className="upgrade-banner">
          <p>You've reached your project limit! Upgrade your plan to create more projects.</p>
          <button 
            className="upgrade-button"
            onClick={() => navigate('/pricing')}
          >
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard 
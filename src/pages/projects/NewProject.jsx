import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { validateCompound } from '../../services/chemicalUtils'
import '../../styles/NewProject.css'

function NewProject() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetCompound: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate compound
    if (!validateCompound(formData.targetCompound)) {
      setError('Invalid compound format. Please use a valid chemical formula (e.g., C6H12O6) or SMILES notation.')
      return
    }

    setLoading(true)

    try {
      // TODO: Add Firebase project creation
      const projectId = 'new-project-id'
      navigate(`/projects/${projectId}`)
    } catch (error) {
      console.error('Error creating project:', error)
      setError('Failed to create project. Please try again.')
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user types in compound field
    if (name === 'targetCompound' && error) {
      setError(null)
    }
  }

  return (
    <div className="new-project-container">
      <h1>Create New Project</h1>
      
      <form onSubmit={handleSubmit} className="project-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetCompound">Target Compound</label>
          <input
            type="text"
            id="targetCompound"
            name="targetCompound"
            value={formData.targetCompound}
            onChange={handleChange}
            required
            placeholder="Enter chemical formula (e.g., C6H12O6) or SMILES notation"
          />
          <small className="help-text">
            Supported formats: Common chemical formulas (e.g., C6H12O6, CH3COOH) or SMILES notation
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')}
            className="button-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="button-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewProject 
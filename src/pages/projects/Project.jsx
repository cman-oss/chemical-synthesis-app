import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useSubscription } from '../../contexts/SubscriptionContext'
import { generateSynthesisPath } from '../../services/askcos'
import { getCompoundName } from '../../services/chemicalUtils'
import '../../styles/Project.css'

function Project() {
  const { projectId } = useParams()
  const { user } = useAuth()
  const { subscription } = useSubscription()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [synthesisPath, setSynthesisPath] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch project details
    const fetchProject = async () => {
      try {
        // Get the compound from URL or localStorage
        const savedCompound = localStorage.getItem(`project_${projectId}_compound`) || 'C20H20O4'
        
        // TODO: Replace with actual API call
        const mockProject = {
          id: projectId,
          title: 'Chemical Synthesis',
          description: 'Synthesis pathway generation',
          targetCompound: savedCompound, // Use the saved compound
          status: 'active',
          createdAt: new Date().toISOString()
        }
        setProject(mockProject)
      } catch (error) {
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  const handleCompoundChange = async (newCompound) => {
    try {
      setLoading(true)
      // Save the new compound
      localStorage.setItem(`project_${projectId}_compound`, newCompound)
      
      // Update project with new compound
      setProject(prev => ({
        ...prev,
        targetCompound: newCompound
      }))

      // Clear previous synthesis path
      setSynthesisPath(null)
      setError(null)
    } catch (error) {
      setError('Failed to update compound')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateSynthesis = async () => {
    try {
      setLoading(true)
      setError(null)

      // Add validation before generating synthesis
      if (!project.targetCompound) {
        throw new Error('No target compound specified')
      }

      const synthesisPath = await generateSynthesisPath(project.targetCompound)
      
      // Format the synthesis steps to use common names where possible
      const formattedSynthesisPath = {
        ...synthesisPath,
        steps: synthesisPath.steps.map(step => ({
          ...step,
          description: step.description.replace(
            /([A-Za-z0-9@\[\]\(\)=#\-+\\\/\.]+)/g,
            match => getCompoundName(match) || match
          )
        }))
      }
      
      setSynthesisPath(formattedSynthesisPath)
    } catch (error) {
      console.error('Synthesis generation error:', error)
      setError(
        error.message === 'Invalid compound structure'
          ? 'This compound is not supported. Please try a common chemical formula (e.g., C9H8O4 for Aspirin).'
          : error.message || 'Failed to generate synthesis path'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async () => {
    if (subscription?.tier !== 'premium') {
      alert('Project deletion is only available for Premium users')
      return
    }

    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // TODO: Replace with actual API call
        navigate('/dashboard')
      } catch (error) {
        setError('Failed to delete project')
      }
    }
  }

  const handleExport = async () => {
    try {
      // TODO: Implement export functionality
      alert('Export feature coming soon!')
    } catch (error) {
      setError('Failed to export project')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!project) return <div>Project not found</div>

  return (
    <div className="project-container">
      <div className="project-header">
        <h1>{project.title}</h1>
        <div className="project-actions">
          <button onClick={handleExport}>Export</button>
          {subscription?.tier === 'premium' && (
            <button 
              onClick={handleDeleteProject}
              className="delete-button"
            >
              Delete Project
            </button>
          )}
        </div>
      </div>

      <div className="project-details">
        <div className="detail-card">
          <h3>Target Compound</h3>
          <div className="compound-input">
            <input
              type="text"
              value={project.targetCompound}
              onChange={(e) => handleCompoundChange(e.target.value)}
              placeholder="Enter chemical formula or name"
            />
          </div>
          <small className="compound-note">
            {project.targetCompound === getCompoundName(project.targetCompound) 
              ? 'SMILES notation'
              : 'Chemical formula'}
          </small>
        </div>

        <div className="detail-card">
          <h3>Description</h3>
          <p>{project.description}</p>
        </div>
      </div>

      <div className="synthesis-section">
        <h2>Synthesis Pathway</h2>
        {error && (
          <div className="error-message">
            {error}
            <button 
              className="retry-button"
              onClick={() => setError(null)}
            >
              Try Again
            </button>
          </div>
        )}
        {!error && !synthesisPath ? (
          <div className="generate-section">
            <button 
              onClick={handleGenerateSynthesis}
              className="generate-button"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Synthesis Path'}
            </button>
            <p className="info-text">
              Click to generate an AI-powered synthesis pathway for {
                getCompoundName(project.targetCompound) || project.targetCompound
              }
            </p>
            <div className="supported-compounds">
              <h4>Supported Compounds:</h4>
              <div className="compound-categories">
                <div className="category">
                  <h5>Natural Products</h5>
                  <ul>
                    <li>C20H20O4 (Frondosin A)</li>
                    <li>C21H20O6 (Usnic acid)</li>
                    <li>C15H10O7 (Quercetin)</li>
                  </ul>
                </div>
                <div className="category">
                  <h5>Pharmaceuticals</h5>
                  <ul>
                    <li>C9H8O4 (Aspirin)</li>
                    <li>C8H9NO2 (Paracetamol)</li>
                    <li>C17H19NO3 (Codeine)</li>
                  </ul>
                </div>
                <div className="category">
                  <h5>Basic Compounds</h5>
                  <ul>
                    <li>CH3COOH (Acetic acid)</li>
                    <li>C6H12O6 (Glucose)</li>
                    <li>C2H5OH (Ethanol)</li>
                  </ul>
                </div>
              </div>
              <p className="note">
                You can use chemical formulas, common names, or SMILES notation. 
                For unsupported compounds, the system will attempt to generate a basic synthesis path.
              </p>
            </div>
          </div>
        ) : (
          <div className="synthesis-path">
            {synthesisPath.steps.map((step) => (
              <div key={step.step} className="synthesis-step">
                <div className="step-header">
                  <h4>Step {step.step}</h4>
                  <span className="confidence">
                    {(step.confidence * 100).toFixed(1)}% confidence
                  </span>
                </div>
                
                <div className="step-description">
                  <p>{step.description}</p>
                  {step.details?.yield && (
                    <span className="yield-badge">Yield: {step.details.yield}</span>
                  )}
                </div>

                <div className="step-details-grid">
                  {step.conditions.length > 0 && (
                    <div className="detail-section">
                      <h5>Conditions</h5>
                      <ul>
                        {step.conditions.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.reagents.length > 0 && (
                    <div className="detail-section">
                      <h5>Reagents</h5>
                      <ul>
                        {step.reagents.map((reagent, index) => (
                          <li key={index}>{reagent}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.details && (
                    <>
                      {step.details.mechanism && (
                        <div className="detail-section">
                          <h5>Mechanism</h5>
                          <p>{step.details.mechanism}</p>
                        </div>
                      )}

                      {step.details.characterization && (
                        <div className="detail-section">
                          <h5>Characterization</h5>
                          <ul>
                            {step.details.characterization.map((method, index) => (
                              <li key={index}>{method}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.details.hazards && (
                        <div className="detail-section warning">
                          <h5>⚠️ Hazards</h5>
                          <ul>
                            {step.details.hazards.map((hazard, index) => (
                              <li key={index}>{hazard}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.details.precautions && (
                        <div className="detail-section">
                          <h5>Precautions</h5>
                          <ul>
                            {step.details.precautions.map((precaution, index) => (
                              <li key={index}>{precaution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {synthesisPath.additionalInfo && (
              <div className="synthesis-additional-info">
                <h4>Additional Information</h4>
                <div className="info-grid">
                  <div className="info-section">
                    <h5>Overall Details</h5>
                    <ul>
                      <li>Total Yield: {synthesisPath.additionalInfo.totalYield}</li>
                      <li>Time Required: {synthesisPath.additionalInfo.timeRequired}</li>
                      <li>Scale Range: {synthesisPath.additionalInfo.scaleRange}</li>
                    </ul>
                  </div>

                  <div className="info-section">
                    <h5>Key Precautions</h5>
                    <ul>
                      {synthesisPath.additionalInfo.keyPrecautions.map((precaution, index) => (
                        <li key={index}>{precaution}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-section">
                    <h5>References</h5>
                    <ul className="references">
                      {synthesisPath.additionalInfo.references.map((ref, index) => (
                        <li key={index}>{ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="synthesis-summary">
              <p>Overall Confidence: {(synthesisPath.confidence * 100).toFixed(1)}%</p>
              <p>Generated: {new Date(synthesisPath.generatedAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Project 
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/Login.css'

function Login() {
  const { signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const selectedPlan = location.state?.selectedPlan

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      
      await signInWithGoogle()
      
      if (selectedPlan) {
        navigate(`/subscribe/${selectedPlan}`)
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <p>
        {selectedPlan 
          ? `Continue to select ${selectedPlan} plan` 
          : 'Sign in to access your projects'}
      </p>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <button 
        className="google-login-button" 
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <img src="/google-icon.svg" alt="Google" />
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  )
}

export default Login 
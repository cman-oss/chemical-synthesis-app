import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Subscribe.css'
import { loadStripe } from '@stripe/stripe-js'

function Subscribe() {
  const { plan } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const plans = {
    free: {
      name: 'Free',
      price: 0,
      features: [
        '3 Project Limit',
        'Basic AI Synthesis',
        'Standard Support'
      ]
    },
    basic: {
      name: 'Basic',
      price: 10,
      features: [
        '10 Project Limit',
        'Advanced AI Synthesis',
        'Priority Support'
      ]
    },
    pro: {
      name: 'Pro',
      price: 30,
      features: [
        '20 Project Limit',
        'Premium AI Synthesis',
        '24/7 Support'
      ]
    },
    premium: {
      name: 'Premium',
      price: 40,
      features: [
        '30 Project Limit',
        'Enterprise AI Synthesis',
        'Dedicated Support',
        'Project Deletion Rights'
      ]
    }
  }

  const selectedPlan = plans[plan?.toLowerCase()]

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login', { state: { selectedPlan: plan } })
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Handle free plan
      if (selectedPlan.price === 0) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/update-subscription`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.uid,
            plan: plan.toLowerCase()
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to activate free plan')
        }

        navigate('/dashboard')
        return
      }

      // Handle paid plans
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan.toLowerCase(),
          userId: user.uid,
          userEmail: user.email
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
      
      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        throw new Error(error.message)
      }

    } catch (error) {
      console.error('Subscription error:', error)
      setError(error.message || 'Failed to process subscription')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPlan) {
    return <div>Invalid plan selected</div>
  }

  return (
    <div className="subscribe-container">
      <div className="subscribe-card">
        <h1>Subscribe to {selectedPlan.name}</h1>
        
        <div className="plan-details">
          <div className="plan-price">
            <span className="currency">$</span>
            <span className="amount">{selectedPlan.price}</span>
            <span className="period">/month</span>
          </div>

          <ul className="plan-features">
            {selectedPlan.features.map((feature, index) => (
              <li key={index}>✓ {feature}</li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          className="subscribe-button"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading 
            ? 'Processing...' 
            : selectedPlan.price === 0 
              ? 'Activate Free Plan' 
              : `Subscribe for $${selectedPlan.price}/month`}
        </button>

        <p className="terms">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          You can cancel your subscription at any time.
        </p>
      </div>
    </div>
  )
}

export default Subscribe 
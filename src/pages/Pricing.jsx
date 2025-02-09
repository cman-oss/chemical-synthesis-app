import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Pricing.css'

function Pricing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        '3 Project Limit',
        'Basic AI Synthesis',
        'Standard Support',
        'Community Access'
      ],
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 10,
      features: [
        '10 Project Limit',
        'Advanced AI Synthesis',
        'Priority Support',
        'API Access',
        'Export Features'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 30,
      features: [
        '20 Project Limit',
        'Premium AI Synthesis',
        '24/7 Support',
        'Full API Access',
        'Team Collaboration',
        'Custom Integrations'
      ],
      popular: false
    }
  ]

  const handleSelectPlan = async (planId) => {
    if (!user) {
      navigate('/login', { state: { selectedPlan: planId } })
      return
    }

    navigate(`/subscribe/${planId}`)
  }

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your research needs</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
          >
            {plan.popular && (
              <div className="popular-badge">Most Popular</div>
            )}
            
            <h2>{plan.name}</h2>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">{plan.price}</span>
              <span className="period">/month</span>
            </div>

            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>

            <button
              className={`select-plan-button ${plan.popular ? 'popular' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-footer">
        <p>All plans include a 14-day money-back guarantee</p>
        <p>Need a custom plan? <a href="#contact">Contact us</a></p>
      </div>
    </div>
  )
}

export default Pricing 
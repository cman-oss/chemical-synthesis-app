import { useNavigate } from 'react-router-dom'
import '../styles/Welcome.css'
import chemistryIcon from '../assets/chemistry-icon.svg'
import moleculeBackground from '../assets/molecule-background.svg'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      <div className="background-pattern">
        <img src={moleculeBackground} alt="" aria-hidden="true" />
      </div>

      <nav className="welcome-nav">
        <div className="logo">
          <img src={chemistryIcon} alt="Chemistry Icon" className="logo-bounce" />
          <span>ChemSynth</span>
        </div>
        <div className="nav-right">
          <button className="language-selector">
            SITE LANGUAGE: ENGLISH
          </button>
          <button 
            className="nav-login-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </nav>

      <main className="welcome-content">
        <div className="content-left">
          <div className="welcome-illustration">
            <div className="floating-elements">
              <img src={chemistryIcon} alt="" className="float-element element-1" />
              <img src={chemistryIcon} alt="" className="float-element element-2" />
              <img src={chemistryIcon} alt="" className="float-element element-3" />
            </div>
            <img src={chemistryIcon} alt="Chemistry Illustration" className="main-icon pulse" />
          </div>
        </div>
        
        <div className="content-right">
          <div className="hero-content">
            <h1>
              <span className="highlight">AI-Powered</span> Chemical Synthesis Prediction
            </h1>
            <p className="subtitle">
              Transform your research with intelligent synthesis pathway discovery
            </p>
            
            <div className="welcome-buttons">
              <button 
                className="get-started-button"
                onClick={() => navigate('/pricing')}
              >
                GET STARTED — IT'S FREE
                <span className="button-subtitle">No credit card required</span>
              </button>
              <button 
                className="login-button"
                onClick={() => navigate('/login')}
              >
                I ALREADY HAVE AN ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="features-section">
        <h2>Why Choose ChemSynth?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">🧪</div>
            <h3>AI-Powered Predictions</h3>
            <p>Advanced algorithms for accurate synthesis pathways</p>
            <ul className="feature-list">
              <li>Multiple pathway suggestions</li>
              <li>Confidence scores</li>
              <li>Real-time updates</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Get results in seconds, not hours</p>
            <ul className="feature-list">
              <li>Instant predictions</li>
              <li>Batch processing</li>
              <li>Efficient optimization</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your research data stays protected</p>
            <ul className="feature-list">
              <li>End-to-end encryption</li>
              <li>Private projects</li>
              <li>Data compliance</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="welcome-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={chemistryIcon} alt="ChemSynth" className="footer-logo" />
            <p>Making chemical synthesis prediction accessible to everyone</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#support">Support</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ChemSynth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Welcome 
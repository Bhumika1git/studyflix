import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import StudyFlixLogo from '../components/StudyFlixLogo';
import './sharedStyles.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-focus email input on mount using useRef
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (resetMessage) setResetMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate async REST API authentication call
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      localStorage.setItem('authToken', 'mock_offline_token_123');
      localStorage.setItem('studyflix_user', JSON.stringify({
        email: formData.email,
        role: 'User',
        name: formData.email.split('@')[0]
      }));
      navigate('/dashboard');
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Please enter your email address to receive password reset instructions.');
      emailInputRef.current?.focus();
      return;
    }
    setResetMessage(`Password reset link sent to ${formData.email}! Check your inbox.`);
  };

  return (
    <div className="auth-container login-container-override">
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      
      {/* Logo in top left corner */}
      <StudyFlixLogo className="auth-logo" />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      <div className="login-header">
        <h1 className="login-title">
          Welcome Back.
        </h1>
        <p className="login-subtitle">
          Log in to continue focused learning and find your study people.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-error">{error}</div>}
        {resetMessage && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
            {resetMessage}
          </div>
        )}
        
        <div>
          <input
            ref={emailInputRef}
            type="email"
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="login-input-blue"
          />
        </div>
        
        <div className="password-container" style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="login-input"
          />
          <span 
            onClick={() => setShowPassword(!showPassword)} 
            className="password-toggle"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword); }}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="forgot-password">
          <a href="#forgot" onClick={handleForgotPassword} className="forgot-password-link">
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="primary-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          {loading ? (
            <>
              <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}></span>
              LOGGING IN...
            </>
          ) : (
            'LOG IN →'
          )}
        </button>

        <div className="auth-footer">
          <span className="auth-footer-text">Don't have an account? </span>
          <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }} className="auth-footer-link">
            Sign up
          </a>
        </div>
      </form>

    </div>
  );
};

export default Login;
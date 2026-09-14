import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sharedStyles.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isPaper, setIsPaper] = useState(true);
  const navigate = useNavigate();

  // Remove side lines from #root and make it full page size
  useEffect(() => {
    const rootEl = document.getElementById('root');
    let originalBorder, originalWidth, originalMinHeight;
    
    if (rootEl) {
      originalBorder = rootEl.style.borderInline;
      originalWidth = rootEl.style.width;
      originalMinHeight = rootEl.style.minHeight;
      
      rootEl.style.borderInline = 'none';
      rootEl.style.width = '100%';
      rootEl.style.minHeight = '100vh';
    }
    
    return () => {
      if (rootEl) {
        rootEl.style.borderInline = originalBorder;
        rootEl.style.width = originalWidth;
        rootEl.style.minHeight = originalMinHeight;
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    // Mock offline authentication
    localStorage.setItem('authToken', 'mock_offline_token_123');
    navigate('/dashboard');
  };

  return (
    <div className={`auth-container login-container-override ${isPaper ? 'paper-bg' : 'screen-bg'}`}>
      
      {/* Logo in top left corner */}
      <div className="logo">
        StudyFlix
      </div>

      {/* Theme Toggle Button */}
      <div className="theme-toggle">
        <span>PAPER</span>
        
        <div 
          onClick={() => setIsPaper(!isPaper)}
          className="theme-toggle-btn"
        >
          <div className={`theme-toggle-circle ${isPaper ? 'paper' : 'screen'}`}></div>
        </div>

        <span>SCREEN</span>
      </div>

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
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input-blue"
          />
        </div>
        
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>

        <div className="forgot-password">
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Forgot Password clicked"); }} className="forgot-password-link">
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit" 
          className="primary-btn"
        >
          LOG IN &rarr;
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
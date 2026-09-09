import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isPaper, setIsPaper] = useState(true);
  const navigate = useNavigate();

  // Background styles simulating the Paper/Screen themes based on your screenshots
  const paperBackground = {
    backgroundColor: '#f6f5f0',
    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  };
  const screenBackground = {
    backgroundColor: '#f6f5f0',
    backgroundImage: 'none',
  };

  const currentBackground = isPaper ? paperBackground : screenBackground;

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
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      flexGrow: 1, padding: '20px', position: 'relative', minHeight: '100vh',
      ...currentBackground
    }}>
      
      {/* Logo in top left corner */}
      <div style={{ position: 'absolute', top: '30px', left: '30px', fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '28px', fontWeight: 'bold', color: '#08060d' }}>
        StudyFlix
      </div>

      {/* Theme Toggle Button */}
      <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #4a4a4a', borderRadius: '24px', padding: '6px 16px', background: 'transparent' }}>
        <span style={{ fontSize: '13px', letterSpacing: '1px', fontWeight: '500', color: '#333' }}>PAPER</span>
        
        <div 
          onClick={() => setIsPaper(!isPaper)}
          style={{ 
            width: '36px', height: '20px', borderRadius: '10px', 
            border: '1px solid #4a4a4a', position: 'relative', cursor: 'pointer',
            background: 'transparent'
          }}
        >
          <div style={{
            width: '12px', height: '12px', borderRadius: '50%', background: '#000',
            position: 'absolute', top: '3px', left: isPaper ? '4px' : '18px',
            transition: 'left 0.2s ease'
          }}></div>
        </div>

        <span style={{ fontSize: '13px', letterSpacing: '1px', fontWeight: '500', color: '#333' }}>SCREEN</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '48px', color: '#08060d', margin: '0 0 12px', fontWeight: 'bold', letterSpacing: '-1px' }}>
          Welcome Back.
        </h1>
        <p style={{ color: '#6b6375', fontSize: '16px', margin: 0 }}>
          Log in to continue focused learning and find your study people.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {error && <div style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{error}</div>}
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', padding: '14px 16px', borderRadius: '6px', 
              border: '1px solid #d1d5db', background: '#eff4ff', 
              fontSize: '15px', boxSizing: 'border-box', color: '#333', outline: 'none'
            }}
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
            style={{ 
              width: '100%', padding: '14px 16px', borderRadius: '6px', 
              border: '1px solid #e5e7eb', background: '#ffffff', 
              fontSize: '15px', boxSizing: 'border-box', color: '#333', outline: 'none'
            }}
          />
        </div>

        <div style={{ textAlign: 'right', marginTop: '-8px' }}>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Forgot Password clicked"); }} style={{ color: '#6b6375', fontSize: '13px', textDecoration: 'none' }}>
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit" 
          style={{ 
            width: '100%', padding: '14px', borderRadius: '30px', 
            cursor: 'pointer', border: 'none', background: '#ff5c35', 
            color: '#fff', fontSize: '15px', fontWeight: '600', 
            marginTop: '8px', transition: 'opacity 0.2s' 
          }}
          onMouseOver={(e) => e.target.style.opacity = 0.9}
          onMouseOut={(e) => e.target.style.opacity = 1}
        >
          LOG IN &rarr;
        </button>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '14px', color: '#6b6375' }}>Don't have an account? </span>
          <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }} style={{ color: '#ff5c35', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
            Sign up
          </a>
        </div>
      </form>

    </div>
  );
};

export default Login;
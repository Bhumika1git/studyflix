import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sharedStyles.css';

const AuthFlow = () => {
  const [role, setRole] = useState(null); // 'User', 'Administrator', or null
  const [view, setView] = useState('login'); // 'login' or 'signup'
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    designation: '',
    major: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPaper, setIsPaper] = useState(true);
  const navigate = useNavigate();

  // Cascading dropdown data
  const specializationMap = {
    'Bachelor of Engineering (B.E.)': ['Computer Science', 'Software Engineering', 'Artificial Intelligence', 'Mechanical'],
    'BBA': ['Finance', 'Marketing', 'Human Resources'],
    'BCA': ['Software Development', 'Web Design'],
    'B.Sc': ['Physics', 'Mathematics', 'Chemistry']
  };

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
    
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Reset specialization if major changes
      if (name === 'major') {
        updated.specialization = '';
      }
      return updated;
    });
    
    if (error) setError('');
  };

  const validatePassword = (pass) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(pass);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    localStorage.setItem('authToken', `mock_${role.toLowerCase()}_token`);
    navigate('/dashboard');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long, contain a number, and a special character.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    localStorage.setItem('authToken', `mock_${role.toLowerCase()}_token`);
    navigate('/dashboard');
  };

  const today = new Date().toISOString().split('T')[0];

  // --- Render Helpers ---

  const renderRoleSelection = () => (
    <div className="role-selection-container">
      <h1 className="role-selection-title">
        Are you a User or an Administrator?
      </h1>
      <div className="role-selection-buttons">
        <button 
          onClick={() => { setRole('User'); setView('login'); }}
          className="primary-btn btn-max-200 btn-dark"
        >
          User
        </button>
        <button 
          onClick={() => { setRole('Administrator'); setView('login'); }}
          className="primary-btn btn-max-200 btn-gray"
        >
          Administrator
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <form onSubmit={handleLoginSubmit} className="auth-form login-form">
      <div className="auth-flow-header">
        <h2 className="auth-flow-title">{role} Login</h2>
      </div>

      {error && <div className="auth-error">{error}</div>}
      
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="form-input" />
      
      <div className="password-container">
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-input" />
        <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <button type="submit" className="primary-btn margin-top-8">LOG IN &rarr;</button>

      <div className="auth-footer">
        <a href="#back" onClick={(e) => { e.preventDefault(); setRole(null); }} className="auth-footer-back-link">&larr; Back to Role Selection</a>
        
        {role === 'User' && (
          <a href="#signup" onClick={(e) => { e.preventDefault(); setView('signup'); setError(''); }} className="auth-footer-link">Sign up</a>
        )}
      </div>
    </form>
  );

  const renderSignup = () => (
    <form onSubmit={handleSignupSubmit} className="auth-form">
      <div className="auth-flow-signup-header">
        <h2 className="auth-flow-title">Create User Account</h2>
      </div>

      {error && <div className="auth-error">{error}</div>}
      
      <div className="form-row">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="form-input" />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="form-input" />
      </div>
      
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="form-input" />
      
      <input type="tel" name="mobile" placeholder="Mobile Number (10 digits)" value={formData.mobile} onChange={handleChange} required maxLength="10" className="form-input" />

      <div className="form-row">
        <select name="designation" value={formData.designation} onChange={handleChange} required className="form-input select-input" style={{ color: formData.designation ? '#333' : '#999' }}>
          <option value="" disabled>Select Designation</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Alumni">Alumni</option>
          <option value="Guest">Guest</option>
        </select>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required max={today} className="form-input" style={{ color: formData.dob ? '#333' : '#999' }} />
      </div>

      <div className="form-row">
        <select name="major" value={formData.major} onChange={handleChange} required className="form-input select-input" style={{ color: formData.major ? '#333' : '#999' }}>
          <option value="" disabled>Select Major</option>
          {Object.keys(specializationMap).map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>

        <select name="specialization" value={formData.specialization} onChange={handleChange} disabled={!formData.major} required className="form-input select-input" style={{ color: formData.specialization ? '#333' : '#999' }}>
          <option value="" disabled>Select Specialization</option>
          {formData.major && specializationMap[formData.major].map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div className="password-container">
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password (Min 8 chars, 1 number, 1 special)" value={formData.password} onChange={handleChange} required className="form-input" />
        <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">{showPassword ? '🙈' : '👁️'}</span>
      </div>

      <div className="password-container">
        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="form-input" />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">{showConfirmPassword ? '🙈' : '👁️'}</span>
      </div>

      <button type="submit" className="primary-btn margin-top-8">SIGN UP &rarr;</button>

      <div className="auth-footer">
        <span className="auth-footer-text">Already have an account? </span>
        <a href="#login" onClick={(e) => { e.preventDefault(); setView('login'); setError(''); }} className="auth-footer-link">Log in</a>
      </div>
    </form>
  );

  return (
    <div className={`auth-container ${isPaper ? 'paper-bg' : 'screen-bg'}`}>
      
      {/* Logo */}
      <div className="logo">
        StudyFlix
      </div>

      {/* Theme Toggle Button */}
      <div className="theme-toggle">
        <span>PAPER</span>
        <div onClick={() => setIsPaper(!isPaper)} className="theme-toggle-btn">
          <div className={`theme-toggle-circle ${isPaper ? 'paper' : 'screen'}`}></div>
        </div>
        <span>SCREEN</span>
      </div>

      {!role ? renderRoleSelection() : (view === 'login' ? renderLogin() : renderSignup())}

    </div>
  );
};

export default AuthFlow;

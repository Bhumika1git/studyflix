import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Background styles simulating the Paper/Screen themes
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

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '6px', 
    border: '1px solid #d1d5db', background: '#ffffff', 
    fontSize: '14px', boxSizing: 'border-box', color: '#333', outline: 'none'
  };

  const btnStyle = {
    width: '100%', padding: '14px', borderRadius: '30px', cursor: 'pointer', 
    border: 'none', background: '#ff5c35', color: '#fff', fontSize: '15px', 
    fontWeight: '600', transition: 'opacity 0.2s' 
  };

  // --- Render Helpers ---

  const renderRoleSelection = () => (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '42px', color: '#08060d', marginBottom: '32px' }}>
        Are you a User or an Administrator?
      </h1>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button 
          onClick={() => { setRole('User'); setView('login'); }}
          style={{ ...btnStyle, maxWidth: '200px', background: '#08060d' }}
        >
          User
        </button>
        <button 
          onClick={() => { setRole('Administrator'); setView('login'); }}
          style={{ ...btnStyle, maxWidth: '200px', background: '#6b6375' }}
        >
          Administrator
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <form onSubmit={handleLoginSubmit} style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', margin: 0, fontSize: '28px', color: '#08060d' }}>{role} Login</h2>
      </div>

      {error && <div style={{ color: '#d93025', textAlign: 'center', fontSize: '13px', padding: '10px', background: '#fce8e6', borderRadius: '6px' }}>{error}</div>}
      
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
      
      <div style={{ position: 'relative' }}>
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
        <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer' }}>
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <button type="submit" style={{ ...btnStyle, marginTop: '8px' }}>LOG IN &rarr;</button>

      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <a href="#back" onClick={(e) => { e.preventDefault(); setRole(null); }} style={{ color: '#6b6375', fontSize: '14px', textDecoration: 'none', marginRight: '16px' }}>&larr; Back to Role Selection</a>
        
        {role === 'User' && (
          <a href="#signup" onClick={(e) => { e.preventDefault(); setView('signup'); setError(''); }} style={{ color: '#ff5c35', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Sign up</a>
        )}
      </div>
    </form>
  );

  const renderSignup = () => (
    <form onSubmit={handleSignupSubmit} style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', margin: 0, fontSize: '28px', color: '#08060d' }}>Create User Account</h2>
      </div>

      {error && <div style={{ color: '#d93025', textAlign: 'center', fontSize: '13px', padding: '10px', background: '#fce8e6', borderRadius: '6px' }}>{error}</div>}
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
      </div>
      
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
      
      <input type="tel" name="mobile" placeholder="Mobile Number (10 digits)" value={formData.mobile} onChange={handleChange} required maxLength="10" style={inputStyle} />

      <div style={{ display: 'flex', gap: '12px' }}>
        <select name="designation" value={formData.designation} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer', color: formData.designation ? '#333' : '#999' }}>
          <option value="" disabled>Select Designation</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Alumni">Alumni</option>
          <option value="Guest">Guest</option>
        </select>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required max={today} style={{ ...inputStyle, color: formData.dob ? '#333' : '#999' }} />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <select name="major" value={formData.major} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer', color: formData.major ? '#333' : '#999' }}>
          <option value="" disabled>Select Major</option>
          {Object.keys(specializationMap).map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>

        <select name="specialization" value={formData.specialization} onChange={handleChange} disabled={!formData.major} required style={{ ...inputStyle, cursor: formData.major ? 'pointer' : 'not-allowed', background: formData.major ? '#fff' : '#f9f9f9', color: formData.specialization ? '#333' : '#999' }}>
          <option value="" disabled>Select Specialization</option>
          {formData.major && specializationMap[formData.major].map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div style={{ position: 'relative' }}>
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password (Min 8 chars, 1 number, 1 special)" value={formData.password} onChange={handleChange} required style={inputStyle} />
        <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer' }}>{showPassword ? '🙈' : '👁️'}</span>
      </div>

      <div style={{ position: 'relative' }}>
        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer' }}>{showConfirmPassword ? '🙈' : '👁️'}</span>
      </div>

      <button type="submit" style={{ ...btnStyle, marginTop: '8px' }}>SIGN UP &rarr;</button>

      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <span style={{ fontSize: '14px', color: '#6b6375' }}>Already have an account? </span>
        <a href="#login" onClick={(e) => { e.preventDefault(); setView('login'); setError(''); }} style={{ color: '#ff5c35', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Log in</a>
      </div>
    </form>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, padding: '40px 20px', position: 'relative', minHeight: '100vh', ...currentBackground }}>
      
      {/* Logo */}
      <div style={{ position: 'absolute', top: '30px', left: '30px', fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '28px', fontWeight: 'bold', color: '#08060d' }}>
        StudyFlix
      </div>

      {/* Theme Toggle Button */}
      <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #4a4a4a', borderRadius: '24px', padding: '6px 16px', background: 'transparent' }}>
        <span style={{ fontSize: '13px', letterSpacing: '1px', fontWeight: '500', color: '#333' }}>PAPER</span>
        <div onClick={() => setIsPaper(!isPaper)} style={{ width: '36px', height: '20px', borderRadius: '10px', border: '1px solid #4a4a4a', position: 'relative', cursor: 'pointer', background: 'transparent' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#000', position: 'absolute', top: '3px', left: isPaper ? '4px' : '18px', transition: 'left 0.2s ease' }}></div>
        </div>
        <span style={{ fontSize: '13px', letterSpacing: '1px', fontWeight: '500', color: '#333' }}>SCREEN</span>
      </div>

      {!role ? renderRoleSelection() : (view === 'login' ? renderLogin() : renderSignup())}

    </div>
  );
};

export default AuthFlow;

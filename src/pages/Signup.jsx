import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    countryCode: '+91',
    designation: '',
    dob: '',
    stream: '',
    password: '',
    confirmPassword: '',
    rollNumber: '',
    semester: '',
    gender: '',
    agreedToTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPaper, setIsPaper] = useState(true);
  const navigate = useNavigate();

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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const validatePassword = (pass) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e) => {
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

    if (!formData.agreedToTerms) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    // Mock offline authentication
    localStorage.setItem('authToken', 'mock_offline_token_123');
    navigate('/dashboard');
  };

  // Get max date for DOB (e.g., today's date)
  const today = new Date().toISOString().split('T')[0];

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '6px', 
    border: '1px solid #d1d5db', background: '#ffffff', 
    fontSize: '14px', boxSizing: 'border-box', color: '#333', outline: 'none'
  };

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      flexGrow: 1, padding: '40px 20px', position: 'relative', minHeight: '100vh',
      ...currentBackground
    }}>
      
      {/* Logo in top left corner */}
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

      <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '60px' }}>
        <h1 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '42px', color: '#08060d', margin: '0 0 8px', fontWeight: 'bold', letterSpacing: '-1px' }}>
          Create an Account.
        </h1>
        <p style={{ color: '#6b6375', fontSize: '15px', margin: 0 }}>
          Join StudyFlix to organize your learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        {error && <div style={{ color: '#d93025', textAlign: 'center', fontSize: '13px', padding: '10px', background: '#fce8e6', borderRadius: '6px' }}>{error}</div>}
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
        </div>
        
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <select name="countryCode" value={formData.countryCode} onChange={handleChange} style={{ ...inputStyle, width: '100px', appearance: 'none', cursor: 'pointer' }}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required maxLength="10" style={inputStyle} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <select name="designation" value={formData.designation} onChange={handleChange} required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: formData.designation ? '#333' : '#999' }}>
            <option value="" disabled>Select Designation</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Administrator">Administrator</option>
            <option value="Alumni">Alumni</option>
          </select>

          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required max={today} style={{ ...inputStyle, color: formData.dob ? '#333' : '#999' }} />
        </div>

        <select name="stream" value={formData.stream} onChange={handleChange} disabled={!formData.designation} required style={{ ...inputStyle, appearance: 'none', cursor: formData.designation ? 'pointer' : 'not-allowed', background: formData.designation ? '#fff' : '#f9f9f9', color: formData.stream ? '#333' : '#999' }}>
          <option value="" disabled>Select Stream / Course</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="BCA">BCA</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Electrical">Electrical Engineering</option>
          <option value="Other">Other</option>
        </select>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" name="rollNumber" placeholder="Roll No. / Reg ID" value={formData.rollNumber} onChange={handleChange} required style={inputStyle} />
          <select name="semester" value={formData.semester} onChange={handleChange} required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: formData.semester ? '#333' : '#999' }}>
            <option value="" disabled>Year / Semester</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        <select name="gender" value={formData.gender} onChange={handleChange} required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: formData.gender ? '#333' : '#999' }}>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <div style={{ position: 'relative' }}>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password (Min 8 chars, 1 number, 1 special)" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer', userSelect: 'none' }}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '12px', top: '12px', cursor: 'pointer', userSelect: 'none' }}>
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
          <input type="checkbox" id="agreedToTerms" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required style={{ marginTop: '4px', cursor: 'pointer' }} />
          <label htmlFor="agreedToTerms" style={{ fontSize: '13px', color: '#6b6375', lineHeight: '1.4' }}>
            I agree to the StudyFlix <a href="#terms" style={{ color: '#ff5c35', textDecoration: 'none' }}>Terms and Conditions</a>.
          </label>
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
          SIGN UP &rarr;
        </button>

        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '14px', color: '#6b6375' }}>Already have an account? </span>
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: '#ff5c35', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
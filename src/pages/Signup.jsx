import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import StudyFlixLogo from '../components/StudyFlixLogo';
import './sharedStyles.css';

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

  return (
    <div className="auth-container">
      
      {/* Logo in top left corner */}
      <StudyFlixLogo className="auth-logo" />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      <div className="auth-header">
        <h1 className="auth-title">
          Create an Account.
        </h1>
        <p className="auth-subtitle">
          Join StudyFlix to organize your learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-row">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="form-input" />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="form-input" />
        </div>
        
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="form-input" />
        
        <div className="form-row-small-gap">
          <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="form-input select-input width-100">
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required maxLength="10" className="form-input" />
        </div>

        <div className="form-row">
          <select name="designation" value={formData.designation} onChange={handleChange} required className="form-input select-input" style={{ color: formData.designation ? '#333' : '#999' }}>
            <option value="" disabled>Select Designation</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Administrator">Administrator</option>
            <option value="Alumni">Alumni</option>
          </select>

          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required max={today} className="form-input" style={{ color: formData.dob ? '#333' : '#999' }} />
        </div>

        <select name="stream" value={formData.stream} onChange={handleChange} disabled={!formData.designation} required className="form-input select-input" style={{ color: formData.stream ? '#333' : '#999' }}>
          <option value="" disabled>Select Stream / Course</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="BCA">BCA</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Electrical">Electrical Engineering</option>
          <option value="Other">Other</option>
        </select>

        <div className="form-row">
          <input type="text" name="rollNumber" placeholder="Roll No. / Reg ID" value={formData.rollNumber} onChange={handleChange} required className="form-input" />
          <select name="semester" value={formData.semester} onChange={handleChange} required className="form-input select-input" style={{ color: formData.semester ? '#333' : '#999' }}>
            <option value="" disabled>Year / Semester</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        <select name="gender" value={formData.gender} onChange={handleChange} required className="form-input select-input" style={{ color: formData.gender ? '#333' : '#999' }}>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <div className="password-container">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password (Min 8 chars, 1 number, 1 special)" value={formData.password} onChange={handleChange} required className="form-input" />
          <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="password-container">
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="form-input" />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="terms-container">
          <input type="checkbox" id="agreedToTerms" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required className="terms-checkbox" />
          <label htmlFor="agreedToTerms" className="terms-label">
            I agree to the StudyFlix <a href="#terms" className="terms-link">Terms and Conditions</a>.
          </label>
        </div>

        <button 
          type="submit" 
          className="primary-btn"
        >
          SIGN UP &rarr;
        </button>

        <div className="auth-footer">
          <span className="auth-footer-text">Already have an account? </span>
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="auth-footer-link">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
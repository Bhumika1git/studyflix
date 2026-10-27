import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import StudyFlixLogo from '../components/StudyFlixLogo';
import useTheme from '../context/useTheme';
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
  const [loading, setLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const firstNameRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Auto-focus first name input on mount
  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  // Real-time password strength computation (useMemo)
  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return { score: 0, label: '', color: 'transparent', width: '0%' };
    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>\-_]/.test(p)) score += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444', width: '33%' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: '#f59e0b', width: '66%' };
    return { score: 4, label: 'Strong', color: '#10b981', width: '100%' };
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const validatePassword = (pass) => {
    const hasMinLength = pass.length >= 8;
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\-_]/.test(pass);
    return hasMinLength && hasNumber && hasSpecial;
  };

  const handleSubmit = async (e) => {
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

    setLoading(true);
    setError('');

    // Simulate async REST API registration call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem('authToken', 'mock_offline_token_123');
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: `@${formData.firstName.toLowerCase()}${formData.lastName ? formData.lastName.toLowerCase() : ''}`,
        displayName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: `${formData.countryCode} ${formData.mobile}`,
        dob: formData.dob,
        designation: formData.designation,
        stream: formData.stream,
        major: formData.stream,
        bio: `${formData.designation || 'Student'} • ${formData.stream || 'Learner'}`,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.firstName)}`,
        role: 'User'
      };
      localStorage.setItem('studyflix_user', JSON.stringify(newUser));
      localStorage.removeItem('studyflix_user_profile');
      navigate('/dashboard');
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="auth-container">
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      {/* Make the native calendar icon white on the dark "screen" theme */}
      {theme === 'screen' && (
        <style>{`.signup-dob-input::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }`}</style>
      )}
      
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
          <input 
            ref={firstNameRef}
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input" 
          />
          <input 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input" 
          />
        </div>
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          disabled={loading}
          className="form-input" 
        />
        
        <div className="form-row-small-gap">
          <select 
            name="countryCode" 
            value={formData.countryCode} 
            onChange={handleChange} 
            disabled={loading}
            className="form-input select-input width-100"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input 
            type="tel" 
            name="mobile" 
            placeholder="Mobile Number" 
            value={formData.mobile} 
            onChange={handleChange} 
            required 
            maxLength="10" 
            disabled={loading}
            className="form-input" 
          />
        </div>

        <div className="form-row">
          <select 
            name="designation" 
            value={formData.designation} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input select-input" 
            style={{ color: formData.designation ? 'inherit' : '#999' }}
          >
            <option value="" disabled>Select Designation</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Administrator">Administrator</option>
            <option value="Alumni">Alumni</option>
          </select>

          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            required 
            max={today} 
            disabled={loading}
            className="form-input signup-dob-input" 
            style={{ color: formData.dob ? 'inherit' : '#999' }} 
          />
        </div>

        <select 
          name="stream" 
          value={formData.stream} 
          onChange={handleChange} 
          disabled={!formData.designation || loading} 
          required 
          className="form-input select-input" 
          style={{ color: formData.stream ? 'inherit' : '#999' }}
        >
          <option value="" disabled>Select Stream / Course</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="BCA">BCA</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Electrical">Electrical Engineering</option>
          <option value="Other">Other</option>
        </select>

        <div className="form-row">
          <input 
            type="text" 
            name="rollNumber" 
            placeholder="Roll No. / Reg ID" 
            value={formData.rollNumber} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input" 
          />
          <select 
            name="semester" 
            value={formData.semester} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input select-input" 
            style={{ color: formData.semester ? 'inherit' : '#999' }}
          >
            <option value="" disabled>Year / Semester</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          required 
          disabled={loading}
          className="form-input select-input" 
          style={{ color: formData.gender ? 'inherit' : '#999' }}
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>

        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password (Min 8 chars, 1 number, 1 special)" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input" 
          />
          <span 
            onClick={() => setShowPassword(!showPassword)} 
            className="password-toggle"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword); }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Real-time Password Strength Meter */}
        {formData.password && (
          <div style={{ marginBottom: '14px', marginTop: '-6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', color: passwordStrength.color, fontWeight: 600 }}>
              <span>Password Strength</span>
              <span>{passwordStrength.label}</span>
            </div>
            <div style={{ height: '4px', width: '100%', background: 'rgba(150, 150, 150, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: passwordStrength.width, background: passwordStrength.color, transition: 'width 0.3s ease, background 0.3s ease' }}></div>
            </div>
          </div>
        )}

        <div className="password-container">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="form-input" 
          />
          <span 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            className="password-toggle"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowConfirmPassword(!showConfirmPassword); }}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="terms-container">
          <input 
            type="checkbox" 
            id="agreedToTerms" 
            name="agreedToTerms" 
            checked={formData.agreedToTerms} 
            onChange={handleChange} 
            required 
            disabled={loading}
            className="terms-checkbox" 
          />
          <label htmlFor="agreedToTerms" className="terms-label">
            I agree to the StudyFlix{' '}
            <button 
              type="button" 
              onClick={() => setIsTermsModalOpen(true)} 
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--signal-orange, #ff5722)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}
            >
              Terms and Conditions
            </button>.
          </label>
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
              SIGNING UP...
            </>
          ) : (
            'SIGN UP →'
          )}
        </button>

        <div className="auth-footer">
          <span className="auth-footer-text">Already have an account? </span>
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="auth-footer-link">
            Log in
          </a>
        </div>
      </form>

      {/* Accessible Terms and Conditions Modal Dialog */}
      {isTermsModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setIsTermsModalOpen(false)}
        >
          <div 
            style={{
              background: theme === 'screen' ? '#1f1e1b' : '#fff',
              color: theme === 'screen' ? '#f4f0e8' : '#111',
              padding: '28px',
              borderRadius: '12px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>StudyFlix Terms & Conditions</h3>
            <div style={{ maxHeight: '220px', overflowY: 'auto', fontSize: '13px', lineHeight: 1.6, opacity: 0.85, paddingRight: '10px', marginBottom: '20px' }}>
              <p>Welcome to StudyFlix. By creating an account, you agree to comply with our community guidelines, academic integrity policies, and privacy protocols.</p>
              <p>1. <strong>Academic Integrity:</strong> You agree not to distribute unauthorized course answers or violate partner institution standards.</p>
              <p>2. <strong>Team Matching:</strong> You agree to interact respectfully with peer study partners and abide by our anti-harassment policy.</p>
              <p>3. <strong>Data Privacy:</strong> Your study progress and profile details will be handled under our encrypted storage guidelines.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => {
                  setFormData(prev => ({ ...prev, agreedToTerms: true }));
                  setIsTermsModalOpen(false);
                }} 
                className="primary-btn"
                style={{ padding: '8px 20px' }}
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
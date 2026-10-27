import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import StudyFlixLogo from '../components/StudyFlixLogo';
import useTheme from '../context/useTheme';
import './sharedStyles.css';

const AuthFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Initialize role and view based on URL route if directly visiting /signup or /login
  const [role, setRole] = useState(() => {
    if (location.pathname === '/signup' || location.pathname === '/login') return 'User';
    return null;
  });
  const [view, setView] = useState(() => {
    return location.pathname === '/signup' ? 'signup' : 'login';
  });

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
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef(null);
  const firstNameInputRef = useRef(null);

  // Cascading dropdown data
  const specializationMap = useMemo(() => ({
    'Bachelor of Engineering (B.E.)': ['Computer Science', 'Software Engineering', 'Artificial Intelligence', 'Mechanical'],
    'BBA': ['Finance', 'Marketing', 'Human Resources'],
    'BCA': ['Software Development', 'Web Design'],
    'B.Sc': ['Physics', 'Mathematics', 'Chemistry']
  }), []);

  // Memoized available specializations based on selected major (useMemo)
  const availableSpecializations = useMemo(() => {
    return formData.major ? specializationMap[formData.major] || [] : [];
  }, [formData.major, specializationMap]);

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

  // Auto-focus input using useRef when view or role changes
  useEffect(() => {
    if (role && view === 'login') {
      emailInputRef.current?.focus();
    } else if (role && view === 'signup') {
      firstNameInputRef.current?.focus();
    }
  }, [role, view]);

  // DOM side-effect for full layout container
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
      if (name === 'major') {
        updated.specialization = '';
      }
      return updated;
    });

    if (error) setError('');
  };

  const validatePassword = (pass) => {
    const hasMinLength = pass.length >= 8;
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\-_]/.test(pass);
    return hasMinLength && hasNumber && hasSpecial;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate async REST API authentication call
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      localStorage.setItem('authToken', `mock_${role.toLowerCase()}_token`);
      localStorage.setItem('studyflix_user', JSON.stringify({
        email: formData.email,
        role: role,
        name: formData.email.split('@')[0]
      }));
      navigate('/dashboard');
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      setError('Mobile number must be exactly 10 digits.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters, include at least one number and a special character.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate async registration API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem('authToken', `mock_${role.toLowerCase()}_token`);
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: `@${formData.firstName.toLowerCase()}${formData.lastName ? formData.lastName.toLowerCase() : ''}`,
        displayName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        dob: formData.dob,
        designation: formData.designation,
        major: formData.major,
        specialization: formData.specialization,
        bio: `${formData.designation || 'Student'} studying ${formData.major || 'coursework'}.`,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.firstName)}`,
        password: formData.password,
        role: role
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
          type="button"
        >
          User
        </button>
        <button
          onClick={() => { setRole('Administrator'); setView('login'); }}
          className="primary-btn btn-max-200 btn-gray"
          type="button"
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

      <input 
        ref={emailInputRef}
        type="email" 
        name="email" 
        placeholder="Email Address" 
        value={formData.email} 
        onChange={handleChange} 
        required 
        disabled={loading}
        className="form-input" 
      />

      <div className="password-container">
        <input 
          type={showPassword ? "text" : "password"} 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          disabled={loading}
          className="form-input" 
        />
        <span 
          onClick={() => setShowPassword(!showPassword)} 
          className="password-toggle"
          title={showPassword ? "Hide password" : "Show password"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword); }}
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <button type="submit" disabled={loading} className="primary-btn margin-top-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
        <input 
          ref={firstNameInputRef}
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

      <input 
        type="tel" 
        name="mobile" 
        placeholder="Mobile Number (10 digits)" 
        value={formData.mobile} 
        onChange={handleChange} 
        required 
        maxLength="10" 
        disabled={loading}
        className="form-input" 
      />

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
          <option value="Alumni">Alumni</option>
          <option value="Guest">Guest</option>
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

      <div className="form-row">
        <select 
          name="major" 
          value={formData.major} 
          onChange={handleChange} 
          required 
          disabled={loading}
          className="form-input select-input" 
          style={{ color: formData.major ? 'inherit' : '#999' }}
        >
          <option value="" disabled>Select Major</option>
          {Object.keys(specializationMap).map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>

        <select 
          name="specialization" 
          value={formData.specialization} 
          onChange={handleChange} 
          disabled={!formData.major || loading} 
          required 
          className="form-input select-input" 
          style={{ color: formData.specialization ? 'inherit' : '#999' }}
        >
          <option value="" disabled>Select Specialization</option>
          {availableSpecializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

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
          title={showPassword ? "Hide password" : "Show password"}
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
          title={showConfirmPassword ? "Hide password" : "Show password"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowConfirmPassword(!showConfirmPassword); }}
        >
          {showConfirmPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <button type="submit" disabled={loading} className="primary-btn margin-top-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {loading ? (
          <>
            <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}></span>
            CREATING ACCOUNT...
          </>
        ) : (
          'SIGN UP →'
        )}
      </button>

      <div className="auth-footer">
        <span className="auth-footer-text">Already have an account? </span>
        <a href="#login" onClick={(e) => { e.preventDefault(); setView('login'); setError(''); }} className="auth-footer-link">Log in</a>
      </div>
    </form>
  );

  return (
    <div className="auth-container">
      {/* Keyframe animation for button spinners */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      {/* Make the native calendar icon white on the dark "screen" theme */}
      {theme === 'screen' && (
        <style>{`.signup-dob-input::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }`}</style>
      )}

      {/* Logo */}
      <StudyFlixLogo className="auth-logo" />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      {!role ? renderRoleSelection() : (view === 'login' ? renderLogin() : renderSignup())}
    </div>
  );
};

export default AuthFlow;

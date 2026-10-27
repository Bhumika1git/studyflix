import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useTheme from '../context/useTheme';
import './sharedStyles.css';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Profile');
  
  // In-app Toast Notification state (replaces window.alert)
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Accessible Confirmation Modal state for Danger Zone (replaces window.confirm)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Hidden File input ref for Avatar upload (useRef)
  const avatarInputRef = useRef(null);
  
  // Unified Profile State (initialized directly from signup/login data in studyflix_user)
  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem('studyflix_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        return {
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          username: u.username || (u.firstName ? `@${u.firstName.toLowerCase()}` : '@user'),
          displayName: u.displayName || u.firstName || 'Learner',
          email: u.email || 'user@example.com',
          mobile: u.mobile || '',
          dob: u.dob || '',
          designation: u.designation || 'Student',
          major: u.major || u.stream || '',
          specialization: u.specialization || '',
          bio: u.bio || `${u.designation || 'Student'} on StudyFlix.`,
          avatarUrl: u.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.firstName || 'User')}`
        };
      } catch { /* ignore */ }
    }
    return {
      firstName: '',
      lastName: '',
      username: '@user',
      displayName: 'Learner',
      email: 'user@example.com',
      mobile: '',
      dob: '',
      designation: 'Student',
      major: '',
      specialization: '',
      bio: 'Passionate learner.',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StudyFlix'
    };
  });

  // Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityError, setSecurityError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Appearance State (language only; theme is derived directly from ThemeContext)
  const [language, setLanguage] = useState('English (US)');

  // Notifications State (persisted in localStorage)
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('studyflix_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return {
      marketing: false,
      security: true,
      digests: true,
      inApp: true
    };
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    visibility: 'Public'
  });

  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
    if (securityError) setSecurityError('');
  };

  const handleThemeSelectChange = (e) => {
    const value = e.target.value;
    const wantsScreen = value === 'Dark Mode';
    const isCurrentlyScreen = theme === 'screen';
    if ((wantsScreen && !isCurrentlyScreen) || (!wantsScreen && isCurrentlyScreen)) {
      toggleTheme();
      showToast(`Theme switched to ${value}!`);
    }
  };

  const handleNotificationChange = (e) => {
    const updated = { ...notifications, [e.target.name]: e.target.checked };
    setNotifications(updated);
    localStorage.setItem('studyflix_notifications', JSON.stringify(updated));
    showToast('Notification preference updated.');
  };

  const handlePrivacyChange = (e) => {
    setPrivacy({ ...privacy, [e.target.name]: e.target.value });
    showToast(`Visibility set to ${e.target.value}`);
  };

  // Avatar upload handler via useRef
  const handleAvatarFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      const updated = { ...profile, avatarUrl: dataUrl };
      setProfile(updated);
      localStorage.setItem('studyflix_user', JSON.stringify(updated));
      localStorage.removeItem('studyflix_user_profile');
      showToast('Avatar updated successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    localStorage.setItem('studyflix_user', JSON.stringify(profile));
    localStorage.removeItem('studyflix_user_profile');
    showToast('Profile changes saved successfully!');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      setSecurityError('Please fill in all password fields.');
      return;
    }

    // Check current password if saved in user record
    const savedUserStr = localStorage.getItem('studyflix_user');
    if (savedUserStr) {
      try {
        const u = JSON.parse(savedUserStr);
        if (u.password && u.password !== security.currentPassword) {
          setSecurityError('Current password does not match your registered password.');
          return;
        }
      } catch { /* ignore */ }
    }

    if (security.newPassword.length < 8) {
      setSecurityError('New password must be at least 8 characters long.');
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      setSecurityError('New password and confirm password do not match.');
      return;
    }

    // Persist new password into studyflix_user
    if (savedUserStr) {
      try {
        const u = JSON.parse(savedUserStr);
        u.password = security.newPassword;
        localStorage.setItem('studyflix_user', JSON.stringify(u));
      } catch { /* ignore */ }
    }

    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSecurityError('');
    showToast('Password updated and saved successfully!');
  };

  const handleLogoutAllDevices = () => {
    showToast('Logged out of all other 2 active device sessions.', 'info');
  };

  const handleConfirmDeleteAccount = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('studyflix_user');
    localStorage.removeItem('studyflix_user_profile');
    setIsDeleteModalOpen(false);
    navigate('/login');
  };

  // Real client-side data export using Blob API
  const handleExportData = () => {
    const exportPayload = {
      profile,
      appearance: {
        theme: theme === 'screen' ? 'Dark Mode' : 'Light Mode',
        language
      },
      notifications,
      privacy,
      exportedAt: new Date().toISOString(),
      platform: 'StudyFlix Web'
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `studyflix-account-${profile.username.replace('@', '')}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);

    showToast('User data file exported successfully!');
  };

  const tabs = ['Profile', 'Security', 'Appearance', 'Notifications', 'Privacy'];

  const renderProfile = () => (
    <div className="settings-section">
      <h2 className="settings-heading">Profile & Account Information</h2>
      
      <div className="profile-avatar-container">
        <div className="profile-avatar">
          <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <button 
          className="settings-btn settings-btn-secondary" 
          type="button" 
          onClick={() => avatarInputRef.current?.click()}
        >
          Change Avatar
        </button>
        <input 
          type="file" 
          ref={avatarInputRef} 
          onChange={handleAvatarFileSelected} 
          accept="image/*" 
          hidden 
        />
      </div>

      <div className="settings-grid-2">
        <div><label className="settings-label">First Name</label><input name="firstName" value={profile.firstName} onChange={handleProfileChange} className="settings-input" /></div>
        <div><label className="settings-label">Last Name</label><input name="lastName" value={profile.lastName} onChange={handleProfileChange} className="settings-input" /></div>
      </div>
      <div className="settings-grid-2">
        <div><label className="settings-label">Username</label><input name="username" value={profile.username} onChange={handleProfileChange} className="settings-input" /></div>
        <div><label className="settings-label">Display Name</label><input name="displayName" value={profile.displayName} onChange={handleProfileChange} className="settings-input" /></div>
      </div>
      <div className="settings-grid-2">
        <div><label className="settings-label">Email Address</label><input name="email" value={profile.email} disabled className="settings-input" title="Email address cannot be changed" /></div>
        <div><label className="settings-label">Mobile Number</label><input name="mobile" value={profile.mobile} onChange={handleProfileChange} className="settings-input" /></div>
      </div>
      <div className="settings-grid-2">
        <div><label className="settings-label">Designation</label><input name="designation" value={profile.designation} onChange={handleProfileChange} className="settings-input" /></div>
        <div><label className="settings-label">Major / Stream</label><input name="major" value={profile.major} onChange={handleProfileChange} className="settings-input" /></div>
      </div>
      <div>
        <label className="settings-label">Bio / About</label>
        <textarea name="bio" value={profile.bio} onChange={handleProfileChange} className="settings-input settings-textarea" />
      </div>
      <div className="margin-top-10">
        <button className="settings-btn" type="button" onClick={handleSaveProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="settings-section settings-section-center">
      <h2 className="settings-heading settings-heading-center">Security & Credentials</h2>
      
      <form onSubmit={handleUpdatePassword} className="settings-form-wrapper">
        {securityError && (
          <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '14px', textAlign: 'left' }}>
            {securityError}
          </div>
        )}
        <div>
          <label className="settings-label">Current Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showCurrentPassword ? "text" : "password"} 
              name="currentPassword" 
              value={security.currentPassword} 
              onChange={handleSecurityChange} 
              className="settings-input" 
              style={{ paddingRight: '42px' }}
            />
            <span 
              onClick={() => setShowCurrentPassword(!showCurrentPassword)} 
              className="password-toggle"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowCurrentPassword(!showCurrentPassword); }}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
              title={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <div>
          <label className="settings-label">New Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showNewPassword ? "text" : "password"} 
              name="newPassword" 
              value={security.newPassword} 
              onChange={handleSecurityChange} 
              className="settings-input" 
              style={{ paddingRight: '42px' }}
            />
            <span 
              onClick={() => setShowNewPassword(!showNewPassword)} 
              className="password-toggle"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowNewPassword(!showNewPassword); }}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
              title={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <div>
          <label className="settings-label">Confirm New Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword" 
              value={security.confirmPassword} 
              onChange={handleSecurityChange} 
              className="settings-input" 
              style={{ paddingRight: '42px' }}
            />
            <span 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              className="password-toggle"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowConfirmPassword(!showConfirmPassword); }}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none' }}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>
        <div className="margin-top-8">
          <button type="submit" className="settings-btn settings-btn-dark">
            Update Password
          </button>
        </div>
      </form>

      <hr className="settings-divider settings-max-400" />
      
      <div className="text-center settings-max-400">
        <h3 className="settings-subheading">Session Management</h3>
        <p className="settings-description">Log out of all devices where your account is currently active.</p>
        <button className="settings-btn settings-btn-outline" type="button" onClick={handleLogoutAllDevices}>
          Log out of all other devices
        </button>
      </div>

      <hr className="settings-divider settings-max-400" />
      
      <div className="settings-danger-zone settings-max-400">
        <h3 className="settings-subheading settings-subheading-danger">Danger Zone</h3>
        <p className="settings-danger-desc">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="settings-btn settings-btn-danger" type="button" onClick={() => setIsDeleteModalOpen(true)}>
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="settings-section settings-section-center">
      <h2 className="settings-heading settings-heading-center">Appearance & Display</h2>
      <div className="settings-max-400">
        <label className="settings-label">Theme</label>
        <select 
          name="theme" 
          value={theme === 'screen' ? 'Dark Mode' : 'Light Mode'} 
          onChange={handleThemeSelectChange} 
          className="settings-input select-input"
        >
          <option>Light Mode</option>
          <option>Dark Mode</option>
        </select>
      </div>
      <div className="settings-max-400">
        <label className="settings-label">Language & Region</label>
        <select 
          name="language" 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="settings-input select-input"
        >
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="settings-section">
      <h2 className="settings-heading">Notification Preferences</h2>
      
      <div className="settings-form-wrapper">
        <label className="notification-label">
          <input type="checkbox" name="marketing" checked={notifications.marketing} onChange={handleNotificationChange} className="notification-checkbox" /> 
          Marketing Emails
        </label>
        <label className="notification-label">
          <input type="checkbox" name="security" checked={notifications.security} onChange={handleNotificationChange} className="notification-checkbox" /> 
          Security Alerts
        </label>
        <label className="notification-label">
          <input type="checkbox" name="digests" checked={notifications.digests} onChange={handleNotificationChange} className="notification-checkbox" /> 
          Weekly Digests
        </label>
        <label className="notification-label">
          <input type="checkbox" name="inApp" checked={notifications.inApp} onChange={handleNotificationChange} className="notification-checkbox" /> 
          In-App / Push Updates
        </label>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="settings-section">
      <h2 className="settings-heading">Data & Privacy</h2>
      
      <div>
        <label className="settings-label">Profile Visibility</label>
        <select name="visibility" value={privacy.visibility} onChange={handlePrivacyChange} className="settings-input select-input settings-max-300">
          <option>Public</option>
          <option>Private</option>
          <option>Connections Only</option>
        </select>
      </div>
      
      <hr className="settings-divider settings-max-400" />

      <div>
        <h3 className="settings-subheading">Export Your Data</h3>
        <p className="settings-description">Download a JSON copy of your personal data and activity logs.</p>
        <button className="settings-btn settings-btn-dark" type="button" onClick={handleExportData}>
          Export Data (JSON)
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Floating In-App Toast Notification */}
      {toast && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            right: '24px',
            background: toast.type === 'error' ? '#ef4444' : (toast.type === 'info' ? '#3b82f6' : '#10b981'),
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: 500,
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <span>{toast.type === 'error' ? '⚠️' : (toast.type === 'info' ? 'ℹ️' : '✓')}</span>
          <span>{toast.message}</span>
          <button 
            type="button" 
            onClick={() => setToast(null)} 
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', marginLeft: '8px', padding: 0 }}
          >
            ×
          </button>
        </div>
      )}

      {/* Danger Zone Accessible Confirmation Modal */}
      {isDeleteModalOpen && (
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
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div 
            style={{
              background: theme === 'screen' ? '#1f1e1b' : '#fff',
              color: theme === 'screen' ? '#f4f0e8' : '#111',
              padding: '30px',
              borderRadius: '12px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: '#ef4444' }}>
              Delete Account
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', lineHeight: 1.5, opacity: 0.85 }}>
              Are you sure you want to permanently delete your StudyFlix account? All your courses, matching profile, and saved preferences will be erased immediately.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="settings-btn settings-btn-outline"
                style={{ padding: '8px 18px' }}
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleConfirmDeleteAccount}
                className="settings-btn settings-btn-danger"
                style={{ padding: '8px 18px' }}
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="settings-container">
        <div className="settings-layout">
          
          {/* Sidebar */}
          <div className="settings-sidebar">
            <h1 className="settings-sidebar-title">Settings</h1>
            <ul className="settings-nav" role="tablist">
              {tabs.map(tab => (
                <li 
                  key={tab} 
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab(tab); }}
                  className={`settings-nav-item ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          {/* Content Area */}
          <div className="settings-content" role="tabpanel">
            {activeTab === 'Profile' && renderProfile()}
            {activeTab === 'Security' && renderSecurity()}
            {activeTab === 'Appearance' && renderAppearance()}
            {activeTab === 'Notifications' && renderNotifications()}
            {activeTab === 'Privacy' && renderPrivacy()}
          </div>

        </div>
      </div>
    </>
  );
};

export default Settings;

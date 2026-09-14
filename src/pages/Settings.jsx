import React, { useState, useEffect } from 'react';
import './sharedStyles.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isPaper, setIsPaper] = useState(true);

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
  
  // Profile State
  const [profile, setProfile] = useState({
    firstName: 'Abhirath',
    lastName: '',
    username: '@abhirath',
    displayName: 'Abhi',
    email: 'abhirath@example.com',
    mobile: '+919876543210',
    bio: 'Passionate learner.'
  });

  // Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Appearance State
  const [appearance, setAppearance] = useState({
    theme: 'System Default',
    language: 'English (US)'
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    marketing: false,
    security: true,
    digests: true,
    inApp: true
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    visibility: 'Public'
  });

  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSecurityChange = (e) => setSecurity({ ...security, [e.target.name]: e.target.value });
  const handleAppearanceChange = (e) => setAppearance({ ...appearance, [e.target.name]: e.target.value });
  const handleNotificationChange = (e) => setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  const handlePrivacyChange = (e) => setPrivacy({ ...privacy, [e.target.name]: e.target.value });

  const tabs = ['Profile', 'Security', 'Appearance', 'Notifications', 'Privacy'];

  const renderProfile = () => (
    <div className="settings-section">
      <h2 className="settings-heading">Profile & Account Information</h2>
      
      <div className="profile-avatar-container">
        <div className="profile-avatar">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abhirath" alt="Avatar" />
        </div>
        <button className="settings-btn settings-btn-secondary">Change Avatar</button>
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
        <div><label className="settings-label">Email Address</label><input name="email" value={profile.email} disabled className="settings-input" /></div>
        <div><label className="settings-label">Mobile Number</label><input name="mobile" value={profile.mobile} onChange={handleProfileChange} className="settings-input" /></div>
      </div>
      <div>
        <label className="settings-label">Bio / About</label>
        <textarea name="bio" value={profile.bio} onChange={handleProfileChange} className="settings-input settings-textarea" />
      </div>
      <div className="margin-top-10"><button className="settings-btn" onClick={() => alert('Profile saved!')}>Save Changes</button></div>
    </div>
  );

  const renderSecurity = () => (
    <div className="settings-section settings-section-center">
      <h2 className="settings-heading settings-heading-center">Security & Credentials</h2>
      
      <div className="settings-form-wrapper">
        <div><label className="settings-label">Current Password</label><input type="password" name="currentPassword" value={security.currentPassword} onChange={handleSecurityChange} className="settings-input" /></div>
        <div><label className="settings-label">New Password</label><input type="password" name="newPassword" value={security.newPassword} onChange={handleSecurityChange} className="settings-input" /></div>
        <div><label className="settings-label">Confirm New Password</label><input type="password" name="confirmPassword" value={security.confirmPassword} onChange={handleSecurityChange} className="settings-input" /></div>
        <div className="margin-top-8"><button className="settings-btn settings-btn-dark">Update Password</button></div>
      </div>

      <hr className="settings-divider settings-max-400" />
      
      <div className="text-center settings-max-400">
        <h3 className="settings-subheading">Session Management</h3>
        <p className="settings-description">Log out of all devices where your account is currently active.</p>
        <button className="settings-btn settings-btn-outline" onClick={() => alert('Logged out of all other devices!')}>Log out of all other devices</button>
      </div>

      <hr className="settings-divider settings-max-400" />
      
      <div className="settings-danger-zone settings-max-400">
        <h3 className="settings-subheading settings-subheading-danger">Danger Zone</h3>
        <p className="settings-danger-desc">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="settings-btn settings-btn-danger" onClick={() => confirm('Are you sure you want to permanently delete your account?')}>Delete Account</button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="settings-section settings-section-center">
      <h2 className="settings-heading settings-heading-center">Appearance & Display</h2>
      <div className="settings-max-400">
        <label className="settings-label">Theme</label>
        <select name="theme" value={appearance.theme} onChange={handleAppearanceChange} className="settings-input select-input">
          <option>System Default</option>
          <option>Light Mode</option>
          <option>Dark Mode</option>
        </select>
      </div>
      <div className="settings-max-400">
        <label className="settings-label">Language & Region</label>
        <select name="language" value={appearance.language} onChange={handleAppearanceChange} className="settings-input select-input">
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
        <button className="settings-btn settings-btn-dark" onClick={() => alert('Downloading data.json...')}>Export Data (JSON)</button>
      </div>
    </div>
  );

  return (
    <div className={`settings-container ${isPaper ? 'paper-bg' : 'screen-bg'}`}>
      
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

      <div className="settings-layout">
        
        {/* Sidebar */}
        <div className="settings-sidebar">
          <h1 className="settings-sidebar-title">Settings</h1>
          <ul className="settings-nav">
            {tabs.map(tab => (
              <li 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`settings-nav-item ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {activeTab === 'Profile' && renderProfile()}
          {activeTab === 'Security' && renderSecurity()}
          {activeTab === 'Appearance' && renderAppearance()}
          {activeTab === 'Notifications' && renderNotifications()}
          {activeTab === 'Privacy' && renderPrivacy()}
        </div>

      </div>
    </div>
  );
};

export default Settings;

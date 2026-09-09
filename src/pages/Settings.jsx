import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isPaper, setIsPaper] = useState(true);

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

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '6px', 
    border: '1px solid #d1d5db', background: '#ffffff', 
    fontSize: '14px', boxSizing: 'border-box', color: '#333', outline: 'none'
  };
  const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#6b6375' };
  const btnStyle = { padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', border: 'none', background: '#ff5c35', color: '#fff', fontSize: '14px', fontWeight: '600', transition: 'opacity 0.2s' };
  const headingStyle = { fontFamily: '"Playfair Display", "Georgia", serif', fontSize: '28px', color: '#08060d', margin: '0 0 24px 0' };

  const tabs = ['Profile', 'Security', 'Appearance', 'Notifications', 'Privacy'];

  const renderProfile = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={headingStyle}>Profile & Account Information</h2>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#fff', overflow: 'hidden' }}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abhirath" alt="Avatar" style={{ width: '100%', height: '100%' }} />
        </div>
        <button style={{ ...btnStyle, background: '#eee', color: '#333' }}>Change Avatar</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div><label style={labelStyle}>First Name</label><input name="firstName" value={profile.firstName} onChange={handleProfileChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Last Name</label><input name="lastName" value={profile.lastName} onChange={handleProfileChange} style={inputStyle} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div><label style={labelStyle}>Username</label><input name="username" value={profile.username} onChange={handleProfileChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Display Name</label><input name="displayName" value={profile.displayName} onChange={handleProfileChange} style={inputStyle} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div><label style={labelStyle}>Email Address</label><input name="email" value={profile.email} disabled style={{ ...inputStyle, background: '#f5f5f5', color: '#888' }} /></div>
        <div><label style={labelStyle}>Mobile Number</label><input name="mobile" value={profile.mobile} onChange={handleProfileChange} style={inputStyle} /></div>
      </div>
      <div>
        <label style={labelStyle}>Bio / About</label>
        <textarea name="bio" value={profile.bio} onChange={handleProfileChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
      </div>
      <div style={{ marginTop: '10px' }}><button style={btnStyle} onClick={() => alert('Profile saved!')}>Save Changes</button></div>
    </div>
  );

  const renderSecurity = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <h2 style={{ ...headingStyle, textAlign: 'center' }}>Security & Credentials</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
        <div><label style={labelStyle}>Current Password</label><input type="password" name="currentPassword" value={security.currentPassword} onChange={handleSecurityChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>New Password</label><input type="password" name="newPassword" value={security.newPassword} onChange={handleSecurityChange} style={inputStyle} /></div>
        <div><label style={labelStyle}>Confirm New Password</label><input type="password" name="confirmPassword" value={security.confirmPassword} onChange={handleSecurityChange} style={inputStyle} /></div>
        <div style={{ marginTop: '8px' }}><button style={{ ...btnStyle, background: '#333' }}>Update Password</button></div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0', width: '100%', maxWidth: '400px' }} />
      
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#08060d' }}>Session Management</h3>
        <p style={{ fontSize: '14px', color: '#6b6375', marginBottom: '16px' }}>Log out of all devices where your account is currently active.</p>
        <button style={{ ...btnStyle, background: '#f4f3ec', color: '#333', border: '1px solid #d1d5db' }} onClick={() => alert('Logged out of all other devices!')}>Log out of all other devices</button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0', width: '100%', maxWidth: '400px' }} />
      
      <div style={{ background: '#fff0f0', padding: '24px', borderRadius: '8px', border: '1px solid #f8c9c4', width: '100%', maxWidth: '400px', boxSizing: 'border-box', textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#d93025' }}>Danger Zone</h3>
        <p style={{ fontSize: '14px', color: '#333', marginBottom: '16px' }}>Once you delete your account, there is no going back. Please be certain.</p>
        <button style={{ ...btnStyle, background: '#d93025' }} onClick={() => confirm('Are you sure you want to permanently delete your account?')}>Delete Account</button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <h2 style={{ ...headingStyle, textAlign: 'center' }}>Appearance & Display</h2>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <label style={labelStyle}>Theme</label>
        <select name="theme" value={appearance.theme} onChange={handleAppearanceChange} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option>System Default</option>
          <option>Light Mode</option>
          <option>Dark Mode</option>
        </select>
      </div>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <label style={labelStyle}>Language & Region</label>
        <select name="language" value={appearance.language} onChange={handleAppearanceChange} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option>English (US)</option>
          <option>English (UK)</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={headingStyle}>Notification Preferences</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', cursor: 'pointer' }}>
          <input type="checkbox" name="marketing" checked={notifications.marketing} onChange={handleNotificationChange} style={{ width: '18px', height: '18px' }} /> 
          Marketing Emails
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', cursor: 'pointer' }}>
          <input type="checkbox" name="security" checked={notifications.security} onChange={handleNotificationChange} style={{ width: '18px', height: '18px' }} /> 
          Security Alerts
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', cursor: 'pointer' }}>
          <input type="checkbox" name="digests" checked={notifications.digests} onChange={handleNotificationChange} style={{ width: '18px', height: '18px' }} /> 
          Weekly Digests
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', cursor: 'pointer' }}>
          <input type="checkbox" name="inApp" checked={notifications.inApp} onChange={handleNotificationChange} style={{ width: '18px', height: '18px' }} /> 
          In-App / Push Updates
        </label>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={headingStyle}>Data & Privacy</h2>
      
      <div>
        <label style={labelStyle}>Profile Visibility</label>
        <select name="visibility" value={privacy.visibility} onChange={handlePrivacyChange} style={{ ...inputStyle, maxWidth: '300px', cursor: 'pointer' }}>
          <option>Public</option>
          <option>Private</option>
          <option>Connections Only</option>
        </select>
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0', maxWidth: '400px' }} />

      <div>
        <h3 style={{ fontSize: '18px', margin: '0 0 10px', color: '#08060d' }}>Export Your Data</h3>
        <p style={{ fontSize: '14px', color: '#6b6375', marginBottom: '16px' }}>Download a JSON copy of your personal data and activity logs.</p>
        <button style={{ ...btnStyle, background: '#333' }} onClick={() => alert('Downloading data.json...')}>Export Data (JSON)</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '100px 20px 40px', fontFamily: '"Segoe UI", Roboto, sans-serif', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', ...currentBackground }}>
      
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

      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', gap: '40px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Sidebar */}
        <div style={{ width: '250px', background: '#f5f4ef', padding: '32px 0', borderRight: '1px solid #e5e4e7', flexShrink: 0 }}>
          <h1 style={{ margin: '0 24px 24px', fontSize: '26px', color: '#08060d', fontFamily: '"Playfair Display", "Georgia", serif' }}>Settings</h1>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tabs.map(tab => (
              <li 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  padding: '14px 24px', cursor: 'pointer', fontSize: '15px',
                  background: activeTab === tab ? '#eff4ff' : 'transparent',
                  color: activeTab === tab ? '#333' : '#6b6375',
                  fontWeight: activeTab === tab ? '600' : '500',
                  borderLeft: activeTab === tab ? '4px solid #ff5c35' : '4px solid transparent',
                  transition: 'background 0.2s, color 0.2s'
                }}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, padding: '32px 40px 40px 0', minHeight: '500px' }}>
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

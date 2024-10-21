import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";
import "./Styles/Profile.scss";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import UserIcon from "../public/User_Icon.png";
import LeaderboardIcon from "../public/Leaderboard_Icon.png";

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Sean Iguico',
    address: '123 Main St, Anytown, USA',
    email: 'gggggg@gmail.com',
    password: '123456789',
    picture: '',
  });
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Log Usage") {
      navigate('/LogUsage'); 
    } else if (tab === "Tips & Advice") {
      navigate('/Tips'); 
    } else if (tab === "Overview") {
      navigate('/App');
    } else if (tab === "Goals") {
      navigate('/Goal');
    } else if (tab === "Impact") {
      navigate('/Impact');
    } else if (tab === "Leaderboard"){
      navigate('/LeaderBoards');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      navigate('/LogIn');
    }
  };

  return (
    <div className="profile-container">
         <header className="top-bar">
        {/* Hamburger Menu Button */}
        <div className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="logo">
          <img src={WaterdropLogo} alt="Water Drop Logo" />
          <h1>WaterSaver</h1>
        </div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          {["Log Usage", "Tips & Advice", "Overview", "Goals", "Impact"].map(tab => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => {
                handleTabClick(tab);
                setMenuOpen(false); // Close menu on tab click
              }}
            >
              {tab}
            </div>
          ))}
        </nav>


        <div className="leaderboard-button-container">
          <button 
            className={`leaderboard-button ${activeTab === 'leaderboards' ? 'active' : ''}`} 
            onClick={() => {
              handleTabClick('Leaderboard');
              setMenuOpen(false);
            }}
          >
            <img src={LeaderboardIcon} className="leaderboard-icon" alt="Leaderboard Icon" />
          </button>
        </div>



        <div className="greeting" onClick={toggleDropdown}>
          <span>Hi!</span>
          <span className="dropdown-arrow">▼</span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu open">
            <div className="tab" onClick={() => navigate('/Profile')}>Profile</div>
            <div className="tab" onClick={handleSignOut}>Sign Out</div>
          </div>
        )}
      </header>
      <h2 className="profile-title">User Profile</h2>
      <img src={UserIcon} alt="Profile" className="profile-picture" />
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Address:</label>
            <input className="form-input" type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button className="submit-button" type="submit">Save Changes</button>
        </form>
      ) : (
        <div className="profile-info">
          <p className="info-item"><strong>Name:</strong> {user.name}</p>
          <p className="info-item"><strong>Address:</strong> {user.address}</p>
          <p className="info-item"><strong>Email:</strong> {user.email}</p>
          <p className="info-item"><strong>Password:</strong> {user.password.replace(/./g, '*')}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;

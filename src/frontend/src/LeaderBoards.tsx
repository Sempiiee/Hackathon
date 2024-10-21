import React, { useState, useRef, useEffect } from "react";
import "./Styles/ActiveTab.scss";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import { useNavigate } from 'react-router-dom';

const LeaderBoards: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("Leaderboards");
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

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
      <div className="app-container">
        <header className="top-bar">
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
                  setMenuOpen(false);
                }}
              >
                {tab}
              </div>
            ))}
          </nav>
  
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
  
       
      </div>
    );
  };
  
  export default LeaderBoards;
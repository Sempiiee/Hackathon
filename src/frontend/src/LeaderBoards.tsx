import React, { useState, useEffect } from "react";
import "./Styles/ActiveTab.scss";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import LeaderboardIcon from "../public/Leaderboard_Icon.png";
import { useNavigate } from 'react-router-dom';
import { GlobalState } from './global';

const LeaderBoards: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("Leaderboards");
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [waterStats, setWaterStats] = useState<number[]>([]);

    ///// User Statistics

    const fetchWaterConsumptionStats = async () => {
        const email = GlobalState.email ? GlobalState.email : 'Guest';
        const response = await fetch('/configuration/fetch-water-consumption', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        
        if (data.status === 1) {
            setWaterStats(data.data);
        } else {
            console.error(data.message);
        }
    };

    useEffect(() => {
        fetchWaterConsumptionStats();
    }, []);

    const renderWaterStats = () => {
        return (
            <div className="stats-container">
                <h2>This week's statistics - From {GlobalState.email}</h2>
                <ul>
                    {waterStats.map((entry, index) => (
                        <li key={index}>
                            Day {index + 1}: {entry}L
                        </li>
                    ))}
                </ul>
            </div>
        );
    };


    //// Overall Leaderboards

    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

      const fetchLeaderboard = async () => {
          const response = await fetch('/configuration/fetch-leaderboard', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          const data = await response.json();

          if (data.status === 1) {
              setLeaderboardData(data.data);
          } else {
              console.error(data.message);
          }
      };

      useEffect(() => {
          fetchWaterConsumptionStats();
          fetchLeaderboard();
      }, []);

      const renderLeaderboard = () => {
        return (
            <div className="stats-container">
                <h2>Weekly Leaderboard</h2>
                <ol>
                    {leaderboardData.map((user, index) => (
                        <li key={index}>
                            {user.rank}. {user.lastName} - {user.totalWaterConsumption} Liters - {user.region}
                        </li>
                    ))}
                </ol>
            </div>
        );
      };

      /////

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

                <div className="leaderboard-button-container">
                  <button 
                  className={`leaderboard-button ${activeTab === 'leaderboards' ? 'active' : 'inactive'}`} 
                    onClick={() => {
                    handleTabClick('Leaderboard');
                  }}
                  >
                  <img 
                    src={LeaderboardIcon} 
                    className="leaderboard-icon" 
                    alt="Leaderboard Icon" 
                    style={{ opacity: activeTab === 'leaderboards' ? 0.6 : 1 }} // Adjusting opacity based on active tab
                  />
                  </button>
                  </div>

                <div className="greeting" onClick={toggleDropdown}>
                    <span>Hi, {GlobalState.email ? GlobalState.email : 'Guest'}!</span>
                    <span className="dropdown-arrow">▼</span>
                </div>

                {isDropdownOpen && (
                    <div className="dropdown-menu open">
                        <div className="tab" onClick={() => navigate('/Profile')}>Profile</div>
                        <div className="tab" onClick={handleSignOut}>Sign Out</div>
                    </div>
                )}
            </header>

            {renderWaterStats()}
            {renderLeaderboard()}


        </div>
    );
};
export default LeaderBoards;
import React, { useState } from 'react';
import "./Styles/ActiveTab.scss";
import { useNavigate } from 'react-router-dom';
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import WaterUse from "../public/test.png";
import LeaderboardIcon from "../public/Leaderboard_Icon.png";
const Impact: React.FC = () => {
    const [usage, setUsage] = useState<number | ''>('');
    const [activeTab, setActiveTab] = useState<string>("Impact");
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab === "Log Usage") {
            navigate('/LogUsage'); 
          } else if (tab === "Tips & Advice") {
            navigate('/Tips'); 
          } else if (tab === "Overview") {
            navigate('/App');
          }
          else if (tab === "Goals") {
              navigate('/Goal');
          }
          else if (tab === "Impact") {
              navigate('/Impact');
          }else if (tab === "Leaderboard"){
            navigate('/LeaderBoards');
          }
    };
    const handleSignOut = () => {
        const confirmSignOut = window.confirm("Are you sure you want to sign out?");
        if (confirmSignOut) {
          navigate('/LogIn');
        }
      };
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(prev => !prev);
    };
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
      };
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="article-container">
                <header className="top-bar">
                {/* Hamburger Menu Button */}
                <div className="menu-button" onClick={toggleMenu}>
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

        <main className="main-content">
        {activeTab === "Impact" && (
                <div>
                    <h2 className="titleForActivetab">Impact of Your Water Usage</h2> 
                    <div className="article-container">
                    <header className="article-header">
                        <h2  className="article-content">Water and Sanitation Issues in the Philippines</h2>
                    </header>
                    <section className="article-content">
                        <p className="article-content">With a population of 113 million people, access to safe water in the Philippines is challenge for a significant proportion of the population. 
                        According to UN and UNICEF data, 53% of households in the Philippines lack access to a safely managed water supply and 39% lack safe sanitation. 
                        The situation in schools is even more serious, with 55% of schools lacking access to a safely managed water supply and 26% lacking safe sanitation.</p>
                        <div className="article-content">
                            <img className = "article-image" src={WaterUse} alt="Water Drop Logo" />
                            <h6 className="author-date">https://images.app.goo.gl/i9MJmZG7Y8oucuc69</h6>
                        </div>
                        <h2 className="article-content">Water pollution and overuse in the Philippines</h2>
                        <p>Water pollution in the Philippines has far-reaching consequences. Health impacts are severe, 
                        with waterborne diseases being common in areas with poor water quality. 
                        They are among the country’s top 10 factors leading to disease and death.

                        The economic effects of water pollution are equally concerning. 
                        Due to the impact of water-related diseases and contamination, healthcare costs increase and worker productivity declines. 
                        These two factors account for USD 7 billion in annual economic losses.

                        Furthermore, industries that rely on clean water also face economic challenges. 
                        Environmental repercussions include the degradation of aquatic ecosystems and loss of biodiversity. 
                        Polluted waters harm fish populations, reduce biodiversity and disrupt ecosystems. 
                        This environmental degradation directly impacts the tourism and fishing industry. 
                        With tourism accounting for 6.2% and fisheries 1.3% of the country’s GDP, declines in either sector have a significant impact on communities across the country.</p>
                    </section>
                    <aside className="related-articles">
                        <h2 className="article-header">You Might Also Like</h2>
                        <ul>
                        <li><a href="https://www.sciencedirect.com/topics/earth-and-planetary-sciences/aquatic-ecosystem#:~:text=An%20aquatic%20ecosystem%20is%20defined,environment%2C%20maintaining%20a%20dynamic%20equilibrium." target="_blank">Understanding Aquatic Ecosystems</a></li>
                        <li><a href="https://www.worldvision.org/clean-water-news-stories/global-water-crisis-facts#:~:text=global%20water%20crisis-,Fast%20facts%3A%20Global%20water%20crisis,haul%2040%20pounds%20of%20water." target="_blank">The Crisis of Clean Water Access</a></li>
                        <li><a href="https://cleanwaterinternational.org/simple-ways-to-conserve-water/?gad_source=1&gclid=EAIaIQobChMI5J6Wt-yUiQMV3NAWBR0o1haTEAAYASAAEgJ9MPD_BwE" target="_blank">Innovative Solutions for Water Conservation</a></li>
                        </ul>
                    </aside>
                    </div>
                </div>
                )}
        </main>
        </div>
    
    );
};

export default Impact;

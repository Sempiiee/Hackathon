import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";
import "./Styles/ActiveTab.scss";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import LeaderboardIcon from "../public/Leaderboard_Icon.png";

const Tips: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Tips & Advice");
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
    
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };
    const handleSignOut = () => {
      const confirmSignOut = window.confirm("Are you sure you want to sign out?");
      if (confirmSignOut) {
        navigate('/LogIn');
      }
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    return (
        <div className="article-container">
            <header className="top-bar">
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
        {activeTab === "Tips & Advice" && (
          <div>
            <h2 className="titleForActivetab">Water-Saving Tips & Advice</h2>
            <p className="advice">
              Conserving water can also extend the life of your septic system by reducing soil saturation, and reducing any pollution due to leaks. Overloading municipal sewer systems can also cause untreated sewage to flow to lakes and rivers. The smaller the amount of water flowing through these systems, the lower the likelihood of pollution. In some communities, costly sewage system expansion has been avoided by community wide household water conservation.
              There are a number of ways to save water, and they all start with you.
              Designate one glass for your drinking water each day, or refill a water bottle. This will cut down on the number of glasses to wash
              Reuse leftover water from cooked or steamed foods to start a nutritious soup, it's one more way to get eight glasses of water a day.
              If you accidentally drop ice cubes, don't throw them in the sink. Drop them in a house plant instead.
              Washing dark clothes in cold water saves water and energy and helps your clothes retain their color.
              Toilet leaks can be silent! be sure to test your toilet for leaks at least once a year.
              Turn off the water while you brush your teeth and save up to 4 gallons a minute. That's up to 200 gallons a week for a family of four.
              Take 5-minute showers instead of baths. A full bathtub requires up to 70 gallons of water.
              Teach children to turn off faucets tightly after each use.
              Monitor your water bill for unusually high use. You bill and water meter are tools that can help you discover leaks.
              Learn how to use your water meter to check for leaks.
              Grab a wrench and fix that leaky faucet. It's simple, inexpensive, and you can sace 140 gallons a week.
              Be e leak detective! check all hoses, connectors, and faucets regularly for leaks.
              Minimize evaporation by watering during the early morning hours when temperatures are cooler and winds are lighter.
              Use a rain barrel to harvest rainwater from gutter for watering gardens and landscapes.
              Report broken pipes, leaky hydrants and errant sprinklers to property owners or your local water provider.
            </p>
            <div className="divForContent">
              <h4 className="subTitleForActivetab">For Every Room in the House With Plumbing</h4>
              <li className="listContent">Check for leaks in pipes, hoses, faucets, toilets and couplings.</li>
              <li className="listContent">Consider replacing old equipment (like toilets, dishwashers and laundry machines).</li>
              <li className="listContent">Turn off faucets tightly after each use.</li>
              <li className="listContent">Find and fix any leaky faucets.</li>
            </div>
            <div className="divForContent">
              <h4 className="subTitleForActivetab">In the Kitchen</h4>
              <li className="listContent">Do not throw hugas-bigas (rice wash) down the drain. Use it for watering plants.</li>
              <li className="listContent">When washing dishes by hand, don’t leave the water running for rinsing.</li>
              <li className="listContent">When cooking, peel and clean vegetables in a large bowl of water instead of under running water.</li>
              <li className="listContent">Only run the dishwasher when it’s full.</li>
            </div>
            <div className="divForContent">
              <h4 className="subTitleForActivetab">In the Bathroom</h4>
              <li className="listContent">Take short showers instead of baths.</li>
              <li className="listContent">Turn off the water to brush teeth, shave and soap up in the shower. Fill the sink to shave.</li>
              <li className="listContent">Never use your toilet as a wastebasket.</li>
              <li className="listContent">Check toilets to verify they are working properly.</li>
            </div>
            <div className="divForContent">
              <h4 className="subTitleForActivetab">Laundry</h4>
              <li className="listContent">Wash Similar Fabrics Together. This allows for more effective washing, enabling you to use fewer cycles overall.</li>
              <li className="listContent">Run full loads of laundry.</li>
              <li className="listContent">Skip pre-rinsing clothes unless absolutely necessary.</li>
              <li className="listContent">Regularly inspect hoses and connections for leaks to prevent water waste.</li>
            </div>
            <div className="divForContent">
              <h4 className="subTitleForActivetab">Outdoor</h4>
              <li className="listContent">Water during the early parts of the day; Avoid watering when it’s windy.</li>
              <li className="listContent">Use a broom, not a hose, to clean driveways and sidewalks.</li>
              <li className="listContent">Check water bills for any instances of high water use, as this may be an indication of a leak.</li>
            </div>
          </div>
        )}
      </main>
        </div>
    );
};

export default Tips;

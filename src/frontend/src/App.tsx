import React, { useState, useRef, useEffect } from "react";
import "./Styles/App.scss";
import "./Styles/ActiveTab.scss";
import "./Styles/MessageBubble.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterGallonEmpty from "../public/Water_Gallon_Empty.png";
import WaterGallonFilled from "../public/Water_Gallon_Filled.png";
import BouncingArrows from "../public/Bouncing_Arrows.gif";
import StaticArrows from "../public/Static_Arrows.png";
import WaterBottle from "../public/Water_Bottle.png";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import LeaderboardIcon from "../public/Leaderboard_Icon.png";
import { GlobalState } from './global';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const equivalentSectionRef = useRef<HTMLDivElement>(null);
  const bottleShelfWrapperRef = useRef<HTMLDivElement>(null);
  const messageBubblesRef = useRef<HTMLDivElement>(null);

  const [bottleCount, setBottleCount] = useState<number>(0);
  const [shelves, setShelves] = useState<number[]>([0]);

  const [waterConsumption, setWaterConsumption] = useState<number>(0.5); // State to track water consumption

  // Calculates cropping for WaterGallonFilled image in reference to the canister size
  const clipPath = `inset(calc(100% - (27.7% + (27.7% * (1.61 * ${waterConsumption})))) 0% 27.1% 0%)`;

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
    }else if (tab === "Leaderboard"){
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

  const handleGallonClick = () => {
    if (equivalentSectionRef.current) {
      equivalentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bottlesPerShelf = () => {
    return window.innerWidth <= 1300 ? 7 : 10; 
  };

  const getMaxShelves = () => {
    return window.innerWidth <= 1300 ? 3 : 4; // 3 shelves for smaller screens, 4 for larger
  };

  const getMaxBottlesPerShelf = () => {
    return window.innerWidth <= 1300 ? 7 : 10; // 6 bottles for smaller screens, 9 for larger
  };

  const addBottle = () => {
    setBottleCount((prevCount) => {
      const newCount = prevCount + 1;
  
      // Get maximum shelves allowed based on screen width
      const maxShelves = getMaxShelves(); // 3 for media, 4 for non-media
      const maxBottlesPerShelf = getMaxBottlesPerShelf(); // 6 for media, 9 for non-media
  
      // Calculate the total allowed bottles based on max shelves and bottles per shelf
      const totalBottlesAllowed = maxShelves * maxBottlesPerShelf; 
  
      // Always return the new count for bottle count state
      const newShelves = Math.floor(newCount / maxBottlesPerShelf); // Calculate new shelves based on bottles per shelf
  
      // Update shelves only if the bottle count is within the allowed range
      if (newCount <= totalBottlesAllowed) {
        setShelves(Array.from({ length: Math.min(newShelves + 1, maxShelves) }, (_, i) => i));
      }
  
      return newCount; 
    });
  };

  const messages = [
    <div key={1}>
      You are averaging <span style={{ color: '#5474eb' }}>1.3 gallons</span> of water daily!
    </div>,
    <div key={2}>
      That is equivalent to <span style={{ color: 'rgb(121, 176, 37)', fontWeight: 500 }}>{bottleCount}</span>
      <span style={{ color: '#5474eb' }}> 350ml</span> bottles of water.
    </div>
  ];

  const isBetter = true;

  useEffect(() => {
    const adjustBottlePosition = () => {
      if (messageBubblesRef.current && bottleShelfWrapperRef.current) {
        const bubbleHeight = messageBubblesRef.current.offsetHeight;
        bottleShelfWrapperRef.current.style.marginTop = `${bubbleHeight + 20}px`;
      }
    };

    adjustBottlePosition();
    window.addEventListener('resize', adjustBottlePosition);

    return () => {
      window.removeEventListener('resize', adjustBottlePosition);
    };
  }, [bottleCount]);

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

      <div className="content-wrapper">
        <div className="gallon-section" onClick={handleGallonClick}>
          <img
            src={WaterGallonFilled}
            alt="Water Gallon Filled"
            className="gallon-image filled"
            style={{
              clipPath,
            }}
          />
          <img
            src={WaterGallonEmpty}
            alt="Water Gallon Empty"
            className="gallon-image empty"
          />

          <img
            src={WaterGallonMain}
            alt="Water Gallon"
            className="gallon-image main"
          />
          
          {/* Add water consumption text here */}
          <div className="water-consumption-text">
            <span className="big-number">{waterConsumption}</span>
            <span className="unit"> gal</span>
          </div>
        </div>

        <div className="scroll-section">
          <p className="scroll-text">Scroll down to see your statistics</p>
          <div className="arrow-container">
            <img
              src={StaticArrows}
              alt="Static Arrows"
              className="arrow-image"
              onMouseOver={(e) => (e.currentTarget.src = BouncingArrows)}
              onMouseOut={(e) => (e.currentTarget.src = StaticArrows)}
            />
          </div>
        </div>
      </div>

      <div className="equivalent-section" ref={equivalentSectionRef}>
        <div className="message-bubbles-container" ref={messageBubblesRef}>
          <div className="message-bubbles">
            {messages.map((message, index) => (
              <div key={index} className="message-bubble">
                {message}
              </div>
            ))}
          </div>
        </div>

        <button className="add-bottle-button" onClick={addBottle}>
          Add Water Bottle
        </button>

        <div className="bottle-shelf-wrapper" ref={bottleShelfWrapperRef}>
          <div className="shelves">
            {shelves.map((_, shelfIndex) => (
              <div className="shelf" key={shelfIndex}>
                {Array.from({ length: Math.min(bottleCount - shelfIndex * bottlesPerShelf(), bottlesPerShelf()) }, (_, index) => (
                  <img key={index} src={WaterBottle} alt="Water Bottle" className="water-bottle" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* New Message */}
        <div className="equivalent-message">
          <div className="better-text">
            This is&nbsp;
            <span className={isBetter ? 'better' : 'worse'}>
              {isBetter ? 'better' : 'worse'}&nbsp;
            </span>
            than&nbsp;
            <span className="percentage-text">89%</span>
          </div>
          <div className="area-text">of people in your area!</div>
        </div>
      </div>
      
    </div>
  );
};

export default App;
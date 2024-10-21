import React, { useState, useRef, useEffect } from "react";
import "./Styles/App.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterGallonEmpty from "../public/Water_Gallon_Empty.png";
import WaterGallonFilled from "../public/Water_Gallon_Filled.png";
import BouncingArrows from "../public/Bouncing_Arrows.gif";
import StaticArrows from "../public/Static_Arrows.png";
import WaterBottle from "../public/Water_Bottle.png";
import WaterdropLogo from "../public/Waterdrop_Logo.png";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [bottleCount, setBottleCount] = useState(0);
  const [shelves, setShelves] = useState<number[]>([0]);
  const equivalentSectionRef = useRef<HTMLDivElement>(null);
  const bottleShelfWrapperRef = useRef<HTMLDivElement>(null);
  const messageBubblesRef = useRef<HTMLDivElement>(null);
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab.replace(/ & /g, "")}`);
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) navigate('/LogIn');
  };
  const handleGallonClick = () => equivalentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  
  const addBottle = () => {
    setBottleCount(prevCount => {
      const newCount = prevCount + 1;
      setShelves(Array.from({ length: Math.ceil(newCount / bottlesPerShelf()) }));
      return newCount;
    });
  };

  const bottlesPerShelf = () => (window.innerWidth <= 1300 ? 7 : 10);

  useEffect(() => {
    const adjustBottlePosition = () => {
      if (messageBubblesRef.current && bottleShelfWrapperRef.current) {
        bottleShelfWrapperRef.current.style.marginTop = `${messageBubblesRef.current.offsetHeight + 20}px`;
      }
    };
    adjustBottlePosition();
    window.addEventListener('resize', adjustBottlePosition);
    return () => window.removeEventListener('resize', adjustBottlePosition);
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
            <div key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => handleTabClick(tab)}>
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

      <div className="content-wrapper">
        <div className="gallon-section" onClick={handleGallonClick}>
          <img src={WaterGallonFilled} alt="Water Gallon Filled" className="gallon-image filled" />
          <img src={WaterGallonEmpty} alt="Water Gallon Empty" className="gallon-image empty" />
          <img src={WaterGallonMain} alt="Water Gallon" className="gallon-image main" />
          <div className="water-consumption-text">
            <span className="big-number">0.8</span>
            <span className="unit"> gal</span>
          </div>
        </div>

        <div className="scroll-section">
          <p className="scroll-text">Scroll down to see your statistics</p>
          <div className="arrow-container">
            <img src={StaticArrows} alt="Static Arrows" className="arrow-image" 
                 onMouseOver={(e) => (e.currentTarget.src = BouncingArrows)}
                 onMouseOut={(e) => (e.currentTarget.src = StaticArrows)} />
          </div>
        </div>
      </div>

      <div className="equivalent-section" ref={equivalentSectionRef}>
        <div className="message-bubbles-container" ref={messageBubblesRef}>
          <div className="message-bubbles">
            <div className="message-bubble">You are averaging <span style={{ color: 'blue' }}>1.3 gallons</span> of water daily!</div>
            <div className="message-bubble">That is equivalent to <span style={{ color: 'rgb(121, 176, 37)', fontWeight: 500 }}>{bottleCount}</span> <span style={{ color: 'blue' }}>350ml</span> bottles of water.</div>
          </div>
        </div>
        <button className="add-bottle-button" onClick={addBottle}>Add Water Bottle</button>
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
      </div>
    </div>
  );
};

export default App;

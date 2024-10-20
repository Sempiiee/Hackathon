// App.tsx

import React, { useState, useRef } from "react";
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

const App: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  // Create a ref for the equivalent section
  const equivalentSectionRef = useRef<HTMLDivElement>(null);
  const [bottleCount, setBottleCount] = useState<number>(0); // State to track the number of bottles
  const [shelves, setShelves] = useState<number[]>([0]); // State to track the number of shelves

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

  const handleGallonClick = () => {
    // Scroll to the equivalent section
    if (equivalentSectionRef.current) {
      equivalentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to add a water bottle
  const addBottle = () => {
    setBottleCount((prevCount) => {
      const newCount = prevCount + 1;
      // Update shelves based on bottle count
      const newShelves = Math.floor(newCount / 5);
      setShelves(Array.from({ length: newShelves + 1 }, (_, i) => i));
      return newCount;
    });
  };

  // Sample messages for the message bubbles with styled text
  const messages = [
    <div key={1}>
      You are averaging <span style={{ color: 'blue' }}>1.3 gallons</span> of water daily!
    </div>,
    <div key={2}>
      That is equivalent to <span style={{ color: 'rgb(121, 176, 37)' }}>14</span> <span style={{ color: 'blue' }}>350ml</span> bottles of water.
    </div>
  ];

  return (
    <div className="app-container">
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
        {/* Gallon images layered on top of each other */}
        <div className="gallon-section" onClick={handleGallonClick}>
          <img
            src={WaterGallonFilled}
            alt="Water Gallon Filled"
            className="gallon-image filled"
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
        </div>

        {/* Scroll Section at the Bottom of the Container */}
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

      {/* New Container Outside the Current Content Wrapper */}
      <div className="equivalent-section" ref={equivalentSectionRef}>
        {/* Message Bubbles Container */}
        <div className="message-bubbles-container">
          <div className="message-bubbles">
            {messages.map((message, index) => (
              <div key={index} className="message-bubble">
                {message}
              </div>
            ))}
          </div>
        </div>

        {/* Button to add water bottle */}
        <button className="add-bottle-button" onClick={addBottle}>
          Add Water Bottle
        </button>

        {/* Bottles on Shelves */}
        <div className="shelves">
  {shelves.map((_, shelfIndex) => (
    <div className="shelf" key={shelfIndex}>
      {Array.from({ length: Math.min(bottleCount - shelfIndex * 5, 5) }, (_, index) => (
        <img key={index} src={WaterBottle} alt="Water Bottle" className="water-bottle" />
      ))}
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default App;

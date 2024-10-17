import React, { useState } from "react";
import "./Styles/App.scss";
import "./Styles/ActiveTab.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterGallonEmpty from "../public/Water_Gallon_Empty.png";
import WaterGallonFilled from "../public/Water_Gallon_Filled.png";
import BouncingArrows from "../public/Bouncing_Arrows.gif";
import StaticArrows from "../public/Static_Arrows.png";
import WaterBottle from "../public/Water_Bottle.png";
import MessageBubbleBig from "../public/Message_Bubble_Big.png";
import MessageBubbleSmall from "../public/Message_Bubble_Small.png";
import WaterdropLogo from "../public/Waterdrop_Logo.png";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [bottlesUsed, setBottlesUsed] = useState<number[]>([]);

  const addBottle = () => {
    setBottlesUsed([...bottlesUsed, bottlesUsed.length + 1]);
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
      navigate('/App');
    } else if (tab === "Impact") {
      navigate('/Impact');
    }
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="app-container">
      <header className="top-bar">
      <div className="logo">
    <img src={WaterdropLogo} alt="Water Drop Logo" />
    <h1>WaterSaver</h1>
  </div>

  {/* Hamburger Menu Button */}
  <div className="menu-button" onClick={toggleMenu}>
    <div></div>
    <div></div>
    <div></div>
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

        <div className="greeting">
          <span>Hi!</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </header>

      <main className="main-content">
        {activeTab === "Overview" && (
          <div className="overview-section">
            <div className="gallon-section">
              <img src={WaterGallonMain} alt="Water Gallon" className="gallon-image" />
              <img src={WaterGallonEmpty} alt="Water Gallon Empty" className="gallon-empty-image" />
              <img src={WaterGallonFilled} alt="Water Gallon Filled" className="gallon-filled-image" />
            </div>

            <div className="bottle-tracking-section">
              <button className="add-bottle-button" onClick={addBottle}>Add Bottle</button>
              <div className="bottle-list">
                {bottlesUsed.map((_, index) => (
                  <img key={index} src={WaterBottle} alt={`Bottle ${index + 1}`} className="bottle-image" />
                ))}
              </div>

              <div className="scroll-indicator">
                <p className="scroll-text">Scroll down to see your statistics</p>
                <div className="arrow-container">
                  <img src={StaticArrows} alt="Static Arrows" className="static" />
                  <img src={BouncingArrows} alt="Bouncing Arrows" className="bouncing" />
                </div>
              </div>
              <div className="bubbles">
                {/* Message Bubble for Bottles Used */}
                <div className="message-bubble">
                  <img src={MessageBubbleBig} alt="Message Bubble" className="bubble-image" />
                  <p className="bubble-text">{bottlesUsed.length} bottles used</p>
                </div>

                {/* Message Bubble for Daily Water Usage */}
                <div className="message-bubble">
                  <img src={MessageBubbleSmall} alt="Message Bubble" className="bubble-image" />
                  <p className="bubble-text">Your daily water usage is 0.8 gallons. Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

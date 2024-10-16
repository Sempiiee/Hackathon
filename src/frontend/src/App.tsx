import React, { useState } from "react";
import "./Styles/App.scss";
import LogIn from "./LogIn";
import Home from "./Home";
import WaterGallonMain from "../public/Water_Gallon_Main.png";
import WaterBottle from "../public/Water_Bottle.png";
import MessageBubble from "../public/Message_Bubble_Big.png";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [bottlesUsed, setBottlesUsed] = useState<number[]>([]);

  const addBottle = () => {
    setBottlesUsed([...bottlesUsed, bottlesUsed.length + 1]);
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="logo">
          <img src="../public/Water_Gallon_Main.png" alt="Water Drop Logo" />
          <h1>WaterSaver</h1>
        </div>
        <nav className="nav">
          {["Log Usage", "Tips & Advice", "Overview", "Goals", "Impact"].map(tab => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
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
            </div>

            <div className="bottle-tracking-section">
              <button className="add-bottle-button" onClick={addBottle}>Add Bottle</button>
              <div className="bottle-list">
                {bottlesUsed.map((_, index) => (
                  <img key={index} src={WaterBottle} alt={`Bottle ${index + 1}`} className="bottle-image" />
                ))}
              </div>

              <div className="message-bubble">
                <img src={MessageBubble} alt="Message Bubble" className="bubble-image" />
                <p>{bottlesUsed.length} bottles used</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Log Usage" && <div><h2>Log Your Water Usage</h2><p>Functionality to log water usage will go here.</p></div>}
        {activeTab === "Tips & Advice" && <div><h2 className="titleForActivetab">Water-Saving Tips & Advice</h2><p className="advice">Conserving water can also extend the life of your septic system by reducing soil saturation, and reducing any pollution due to leaks. Overloading municipal sewer systems can also cause untreated sewage to flow to lakes and rivers. The smaller the amount of water flowing through these systems, the lower the likelihood of pollution. In some communities, costly sewage system expansion has been avoided by community wide household water conservation.
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
                          <li className="listContent">Consider replacing old equipment (like toilets, dishwahers and laundry machines).</li>
                          <li className="listContent">Turn off faucets tightly after each use.</li>
                          <li className="listContent">Find and fix any leaky faucets</li>
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
                          <li className="listContent">Run full loads of laundry.</li>
                          <li className="listContent"> When purchasing a new washing machine, buy a water saving model that can be adjusted to the load size.</li>
                          </div>
                          <div className="divForContentLast">
                          <h4 className="subTitleForActivetab">Outdoor</h4>
                          <li className="listContentLast">Water During the early parts of the day; Avoid watering when it’s windy.</li>
                          <li className="listContentLast"> Use a broom, not a hose, to clean driveways and sidewalks.</li>
                          <li className="listContentLast">Check water bills for any instances of high water use, as this may be an indication of leak.</li>
                          </div>


                          </div>}
        {activeTab === "Goals" && <div><h2>Your Water Usage Goals</h2><p>Set and track your water usage goals here.</p></div>}
        {activeTab === "Impact" && <div><h2>Impact of Your Water Usage</h2><p>View the environmental impact of your water usage here.</p></div>}
      </main>
    </div>
  );
};

export default App;
import React, { useState } from "react";
import "./Styles/App.scss";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import WaterGallonMain from "../public/Water_Gallon_Main.png";

interface HomeProps {
  email: string;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ email, loggedIn, setLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const navigate = useNavigate(); 
  const onButtonClick = () => {
    if (loggedIn) {

      localStorage.removeItem('user');
      setLoggedIn(false);
    } else {
      navigate('./LogIn');
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") { 
    } else if (tab === "Sign Up") {
      navigate('/SignUp'); 
    } else if (tab === "Log In") {
      navigate('/LogIn'); 
    }
  };

  return (
    <div className="mainContainer">
       <header className="top-bar">
        <div className="logo">
          <img src={WaterGallonMain} alt="Water Drop Logo" />
          <h1>WaterSaver</h1>
        </div>
        <nav className="nav">
          {["Home", "Log In", "Sign Up"].map(tab => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>
        <div className="greeting">
          <span>Hi, Jack!</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </header>
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  );
};

export default Home;

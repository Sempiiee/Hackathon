import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";
import WaterdropLogo from "../public/Waterdrop_Logo.png";

interface SignUpProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const regions = [
  "Ilocos Region (Region I)", 
  "Cagayan Valley (Region II)", 
  "Central Luzon (Region III)", 
  "CALABARZON (Region IV-A)", 
  "MIMAROPA (Region IV-B)", 
  "Bicol Region (Region V)", 
  "Western Visayas (Region VI)", 
  "Central Visayas (Region VII)", 
  "Eastern Visayas (Region VIII)", 
  "Zamboanga Peninsula (Region IX)", 
  "Northern Mindanao (Region X)", 
  "Davao Region (Region XI)", 
  "SOCCSKSARGEN (Region XII)", 
  "Caraga (Region XIII)", 
  "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)", 
  "National Capital Region (NCR)", 
  "Cordillera Administrative Region (CAR)"
];

const SignUp: React.FC<SignUpProps> = ({ setLoggedIn, setEmail }) => {
  const [firstName, updateFirstName] = useState<string>('');
  const [middleName, updateMiddleName] = useState<string>('');
  const [lastName, updateLastName] = useState<string>('');
  const [location, updateLocation] = useState<string>('');
  const [email, updateEmail] = useState<string>('');
  const [password, updatePassword] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>(''); 
  const [middleNameError, setMiddleNameError] = useState<string>(''); 
  const [lastNameError, setLastNameError] = useState<string>(''); 
  const [locationError, setLocationError] = useState<string>(''); 
  const [emailError, setEmailError] = useState<string>(''); 
  const [passwordError, setPasswordError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("Sign Up");

  const navigate = useNavigate();

  const validateForm = () => {
    setFirstNameError('');
    setMiddleNameError('');
    setLastNameError('');
    setLocationError('');
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('Please enter your first name');
      isValid = false;
    }
    
    if (middleName.trim() === '') {
      setMiddleNameError('Please enter your middle name');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Please enter your last name');
      isValid = false;
    }
    
    if (location.trim() === '') {
      setLocationError('Please select your location');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email');
        isValid = false;
      }
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      isValid = false;
    }

    return isValid;
  };

  const onButtonClick_SignUp = () => {
    if (validateForm()) {
      setLoggedIn(true);
      setEmail(email);
      navigate('/LogIn');
      console.log('Form is valid, proceed with registration...');
    }
  };
  const onButtonLogIn = () => {
    navigate('/LogIn');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      navigate('/'); 
    } else if (tab === "Sign Up") {
      navigate('/SignUp'); 
    } else if (tab === "Log In") {
      navigate('/LogIn');
    }
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
/*

function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/greet?name=${name}`)
      .then(response => response.json()).then((json) => {
        setGreeting(json.greeting)
      });
  }

*/


  return (
    <div className={'mainContainer'}>
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
                    {["Home", "Log In", "Sign Up"].map(tab => (
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
      <div className={'titleContainer'}>
        <div><h1 className="homeTitle">Sign Up</h1></div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={firstName}
          placeholder="Enter your first name here"
          onChange={(ev) => updateFirstName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{firstNameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={middleName}
          placeholder="Enter your middle name here"
          onChange={(ev) => updateMiddleName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{middleNameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={lastName}
          placeholder="Enter your last name here"
          onChange={(ev) => updateLastName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{lastNameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <select 
          value={location}
          onChange={(ev) => updateLocation(ev.target.value)}
          className={'inputBoxSelect'}
        >
          <option value="">Select your location</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        <label className="errorLabel">{locationError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => updateEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => updatePassword(ev.target.value)}
          className={'inputBox'}
          type="password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'buttonContainer'}>
        <input className={'inputButton'} type="submit" onClick={onButtonClick_SignUp} value={'Sign Up'} />
      </div>
      <div className={'inputContainer'}>
      <button className = "signUp" onClick={onButtonLogIn}>Already Have an account? Log In</button>
      </div>
    </div>
  );
};
export default SignUp;

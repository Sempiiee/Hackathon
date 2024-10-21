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
  const [firstName, setFirstName] = useState<string>('');
  const [middleInitial, setMiddleInitial] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('Please enter your first name');
      isValid = false;
    }
    if (middleInitial.trim() === '') {
      setMiddleNameError('Please enter your middle name');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Please enter your last name');
      isValid = false;
    }
    
    if (region.trim() === '') {
      setLocationError('Please select your location');
      isValid = false;
    }
    if (signupEmail.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailPattern.test(signupEmail)) {
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
  // Signup handler
  const handleSignup = () => {
    if (validateForm()) {
    fetch(`${import.meta.env.VITE_CANISTER_URL}/configuration/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        middleInitial,
        lastName,
        region,
        email: signupEmail,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 1) {
          alert("Signup successful!"); // Notify successful signup
          navigate('/LogIn'); // Redirect to Log In after successful signup
        } else {
          alert(data.message); // Notify of any errors
        }
      });
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



  return (
    <div className="mainContainer">
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
     
      <div className={'inputContainer'}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          className={'inputBox'}
          onChange={(e) => setFirstName(e.target.value)}
        />
         <label className="errorLabel">{firstNameError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>
        <input
          type="text"
          placeholder="Middle Initial"
          value={middleInitial}
          className={'inputBox'}
          onChange={(e) => setMiddleInitial(e.target.value)}
        />
         <label className="errorLabel">{middleNameError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>  
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          className={'inputBox'}
          onChange={(e) => setLastName(e.target.value)}
        />
         <label className="errorLabel">{lastNameError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>  
        <select
          value={region}
          className={'inputBoxSelect'}
          onChange={(e) => setRegion(e.target.value)}
        ><option value="">Select your location</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
         <label className="errorLabel">{locationError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>  
        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          className={'inputBox'}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br/>
      <div className={'inputContainer'}>  
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={'inputBox'}
          onChange={(e) => setPassword(e.target.value)}
        />
         <label className="errorLabel">{passwordError}</label>
      </div>
        <button className ="buttonSignUp" onClick={handleSignup}>Sign Up</button>
      <div className={'inputContainer'}>
      <button className = "signUp" onClick={onButtonLogIn}>Already Have an account? Log In</button>
      </div>
    </div>
  );
};
export default SignUp;

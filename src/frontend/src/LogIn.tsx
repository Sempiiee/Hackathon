import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";
import WaterdropLogo from "../public/Waterdrop_Logo.png";
import { GlobalState } from './global';


interface LoginProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LogIn: React.FC<LoginProps> = ({ setLoggedIn, setEmail }) => {
  const [activeTab, setActiveTab] = useState<string>("Log In");
  const [email, updateEmail] = useState<string>('');
  const [password, updatePassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>(''); 
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>(''); // To handle login errors from the backend

  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

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

  // Handle login
  const onButtonClick = () => {
    if (validateForm()) {
      // Fetch request for logging in
      fetch(`${import.meta.env.VITE_CANISTER_URL}/configuration/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to authenticate'); // Handle bad response
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response:', data);  // Debugging response
          if (data.status === 1) {
            GlobalState.email = email;
            setLoggedIn(true);
            navigate('/App');  // Navigate to /App directly on successful login
          } else {
            setLoginError(data.message || 'Invalid credentials'); // Show error message for incorrect login
          }
        })
        .catch((error) => {
          setLoginError('Error occurred during login. Please try again.');
          console.error('Login error:', error); // Show detailed error
        });
    }
  };

  const onButtonSignUp = () => {
    navigate('/SignUp');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      navigate('/');
    } else if (tab === "Sign Up") {
      navigate('/SignUp');
    }
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className={'mainContainer'}>
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
        <div><h1 className="homeTitle">Login</h1></div>
      </div>

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

      {loginError && <div className="errorLabel">{loginError}</div>} {/* Display login error */}

      <div className={'buttonContainer'}>
        <input className={'inputButton'} type="submit" onClick={onButtonClick} value={'Log in'} />
      </div>

      <div className={'inputContainer'}>
        <button className="signUp" onClick={onButtonSignUp}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LogIn;
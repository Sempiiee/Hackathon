import React, { useState } from 'react';
import "./Styles/ActiveTab.scss";
import "./Styles/LogUsage.scss";
import { useNavigate } from 'react-router-dom';
import WaterdropLogo from "../public/Waterdrop_Logo.png";

const LogUsage: React.FC = () => {
    const [usage, setUsage] = useState<number | ''>('');
    const [showerTime, setShowerTime] = useState<number | ''>('');
    const [brushingFrequency, setBrushingFrequency] = useState<number | ''>('');
    const [washingFrequency, setWashingFrequency] = useState<number | ''>('');
    const [drinkingWater, setDrinkingWater] = useState<number | ''>('');
    const [laundryTime, setLaundryTime] = useState<number | ''>('');
    const [dishwashingTime, setDishwashingTime] = useState<number | ''>('');
    const [toiletFlushingFrequency, setToiletFlushingFrequency] = useState<number | ''>('');
    const [foodDrinkPreparationTime, setFoodDrinkPreparationTime] = useState<number | ''>('');
    const [gardeningTime, setGardeningTime] = useState<number | ''>('');
    const [petCareTime, setPetCareTime] = useState<number | ''>('');
    const [carWashingTime, setCarWashingTime] = useState<number | ''>('');
    const [activeTab, setActiveTab] = useState<string>("Log Usage");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "water-usage":
                setUsage(value ? parseFloat(value) : '');
                break;
            case "showerTime":
                setShowerTime(value ? parseFloat(value) : '');
                break;
            case "brushingFrequency":
                setBrushingFrequency(value ? parseFloat(value) : '');
                break;
            case "washingFrequency":
                setWashingFrequency(value ? parseFloat(value) : '');
                break;
            case "drinkingWater":
                setDrinkingWater(value ? parseFloat(value) : '');
                break;
            case "laundryTime":
                setLaundryTime(value ? parseFloat(value) : '');
                break;
            case "dishwashingTime":
                setDishwashingTime(value ? parseFloat(value) : '');
                break;
            case "toiletFlushingFrequency":
                setToiletFlushingFrequency(value ? parseFloat(value) : '');
                break;
            case "foodDrinkPreparationTime":
                setFoodDrinkPreparationTime(value ? parseFloat(value) : '');
                break;
            case "gardeningTime":
                setGardeningTime(value ? parseFloat(value) : '');
                break;
            case "petCareTime":
                setPetCareTime(value ? parseFloat(value) : '');
                break;
            case "carWashingTime":
                setCarWashingTime(value ? parseFloat(value) : '');
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Water usage input: ${usage} liters`);
        console.log(`Showering time input: ${showerTime} minutes`);
        console.log(`Brushing teeth frequency: ${brushingFrequency} times/day`);
        console.log(`Washing hands frequency: ${washingFrequency} times/day`);
        console.log(`Drinking water input: ${drinkingWater} glasses`);
        console.log(`Laundry time input: ${laundryTime} minutes`);
        console.log(`Dishwashing time input: ${dishwashingTime} minutes`);
        console.log(`Toilet flushing frequency: ${toiletFlushingFrequency} times/day`);
        console.log(`Food & drink preparation time: ${foodDrinkPreparationTime} minutes`);
        console.log(`Gardening time input: ${gardeningTime} minutes`);
        console.log(`Pet care time input: ${petCareTime} minutes`);
        console.log(`Car washing time input: ${carWashingTime} minutes`);

        // Reset all inputs after submission
        setUsage('');
        setShowerTime('');
        setBrushingFrequency('');
        setWashingFrequency('');
        setDrinkingWater('');
        setLaundryTime('');
        setDishwashingTime('');
        setToiletFlushingFrequency('');
        setFoodDrinkPreparationTime('');
        setGardeningTime('');
        setPetCareTime('');
        setCarWashingTime('');
    };
    const handleSignOut = () => {
        const confirmSignOut = window.confirm("Are you sure you want to sign out?");
        if (confirmSignOut) {
          navigate('/LogIn');
        }
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
            navigate('/Goal');
        } else if (tab === "Impact") {
            navigate('/Impact');
        }
    };

    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(prev => !prev);
    };
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
      };
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="input-container">
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
            <h1 className="input-title">Water Usage Input</h1>
            <form className="input-form" onSubmit={handleSubmit}>
                <h2>Hygiene & Consumption</h2>
                <div className="form-group">
                    <label htmlFor="showerTime">Showering Time (in minutes)</label>
                    <input
                        type="number"
                        id="showerTime"
                        name="showerTime"
                        value={showerTime}
                        onChange={handleInputChange}
                        placeholder="Enter showering time"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="brushingFrequency">Brushing Teeth Frequency (times/day)</label>
                    <input
                        type="number"
                        id="brushingFrequency"
                        name="brushingFrequency"
                        value={brushingFrequency}
                        onChange={handleInputChange}
                        placeholder="Enter brushing frequency"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="washingFrequency">Washing Hands Frequency (times/day)</label>
                    <input
                        type="number"
                        id="washingFrequency"
                        name="washingFrequency"
                        value={washingFrequency}
                        onChange={handleInputChange}
                        placeholder="Enter washing frequency"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="drinkingWater">Drinking Water (per glass)</label>
                    <input
                        type="number"
                        id="drinkingWater"
                        name="drinkingWater"
                        value={drinkingWater}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter number of glasses"
                    />
                </div>
                <h2>Household Chores</h2>
                <div className="form-group">
                    <label htmlFor="laundryTime">Laundry (in minutes)</label>
                    <input
                        type="number"
                        id="laundryTime"
                        name="laundryTime"
                        value={laundryTime}
                        onChange={handleInputChange}
                        placeholder="Enter laundry time"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dishwashingTime">Dishwashing (in minutes)</label>
                    <input
                        type="number"
                        id="dishwashingTime"
                        name="dishwashingTime"
                        value={dishwashingTime}
                        onChange={handleInputChange}
                        placeholder="Enter dishwashing time"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="toiletFlushingFrequency">Toilet Flushing Frequency (times/day)</label>
                    <input
                        type="number"
                        id="toiletFlushingFrequency"
                        name="toiletFlushingFrequency"
                        value={toiletFlushingFrequency}
                        onChange={handleInputChange}
                        placeholder="Enter flushing frequency"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foodDrinkPreparationTime">Food & Drink Preparation (in minutes)</label>
                    <input
                        type="number"
                        id="foodDrinkPreparationTime"
                        name="foodDrinkPreparationTime"
                        value={foodDrinkPreparationTime}
                        onChange={handleInputChange}
                        placeholder="Enter preparation time"
                    />
                </div>
                <h2>Other Activities</h2>
                <div className="form-group">
                    <label htmlFor="gardeningTime">Gardening (in minutes)</label>
                    <input
                        type="number"
                        id="gardeningTime"
                        name="gardeningTime"
                        value={gardeningTime}
                        onChange={handleInputChange}
                        placeholder="Enter gardening time"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="petCareTime">Pet Care (in minutes)</label>
                    <input
                        type="number"
                        id="petCareTime"
                        name="petCareTime"
                        value={petCareTime}
                        onChange={handleInputChange}
                        placeholder="Enter pet care time"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="carWashingTime">Car Washing (in minutes)</label>
                    <input
                        type="number"
                        id="carWashingTime"
                        name="carWashingTime"
                        value={carWashingTime}
                        onChange={handleInputChange}
                        placeholder="Enter car washing time"
                    />
                </div>
                <button type="submit" className="input-button">Submit</button>
            </form>
            <p className="feedback-message">Thank you for tracking your water usage!</p>
        </div>
    );
};

export default LogUsage;

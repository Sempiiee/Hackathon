import React, { useState } from 'react';
import "./Styles/ActiveTab.scss";
import "./Styles/Goal.scss";
import { useNavigate } from 'react-router-dom';
import WaterdropLogo from "../public/Waterdrop_Logo.png";

interface Note {
    id: number;
    content: string;
    progress: number;
}

const Goal: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<string>("Goals");
    const handleAddOrUpdate = () => {
        if (editId !== null) {
            setNotes(notes.map(note => note.id === editId ? { ...note, content: inputValue } : note));
            setEditId(null);
        } else {
            const newNote: Note = {
                id: Date.now(),
                content: inputValue,
                progress: 0,
            };
            setNotes([...notes, newNote]);
        }
        setInputValue('');
    };

    const handleEdit = (id: number) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setInputValue(noteToEdit.content);
            setEditId(id);
        }
    };

    const handleRemove = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleProgressChange = (id: number, amount: number) => {
        setNotes(notes.map(note => 
            note.id === id ? { ...note, progress: Math.min(100, note.progress + amount) } : note
        ));
    };

    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (tab === "Log Usage") {
            navigate('/LogUsage'); 
          } else if (tab === "Tips & Advice") {
            navigate('/Tips'); 
          } else if (tab === "Overview") {
            navigate('/App');
          }
          else if (tab === "Goals") {
              navigate('/Goal');
          }
          else if (tab === "Impact") {
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
        <div className="notes-container">
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
                        <div className="tab" onClick={() => navigate('/LogIn')}>Sign Out</div>
                    </div>
                    )}
            </header>
            <h1 className="goalTitle">Your Goals</h1>
            <div className="input-area">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a goal..."
                />
                <button onClick={handleAddOrUpdate}>{editId !== null ? 'Update' : 'Add'}</button>
            </div>
            <div className="notes-list">
                {notes.map(note => (
                    <div key={note.id} className="note">
                        <div className="progress-circle">
                            <svg>
                                <circle cx="30" cy="30" r="28" stroke="#ccc" strokeWidth="4" fill="none" />
                                <circle
                                    cx="30"
                                    cy="30"
                                    r="28"
                                    stroke="#00796b"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={`${note.progress * 1.76} ${176 - (note.progress * 1.76)}`}
                                />
                            </svg>
                            <span>{note.progress}%</span>
                        </div>
                        <div className="note-content">
                            <p>{note.content}</p>
                            <div className="note-actions">
                                <button onClick={() => handleEdit(note.id)}>Edit</button>
                                <button onClick={() => handleRemove(note.id)}>Remove</button>
                                <button onClick={() => handleProgressChange(note.id, 10)}>+10%</button>
                                <button onClick={() => handleProgressChange(note.id, -10)}>-10%</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goal;

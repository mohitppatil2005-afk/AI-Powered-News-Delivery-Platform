import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Preferences.css";

function Preferences() {
    const categories = [
        "Technology",
        "Business",
        "Sports",
        "Health",
        "Science",
        "Entertainment"
    ];

    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
        const savedInterests = JSON.parse(localStorage.getItem("interests"));

        if (savedInterests) {
            setSelectedInterests(savedInterests);
        }
    }, []);

    function handleInterest(category) {
        if (selectedInterests.includes(category)) {
            setSelectedInterests(
                selectedInterests.filter((item) => item !== category)
            );
        } else {
            setSelectedInterests([...selectedInterests, category]);
        }
    }

    function handleSave() {
        localStorage.setItem(
            "interests",
            JSON.stringify(selectedInterests)
        );

        alert("Preferences saved successfully!");
    }

    return (
        <>
            <Navbar />

            <div className="preferences-container">
                <h1>Your Preferences</h1>
                <p>Select the categories you are interested in.</p>

                <div className="interest-list">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedInterests.includes(category)
                                    ? "interest-btn active"
                                    : "interest-btn"
                            }
                            onClick={() => handleInterest(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save Preferences
                </button>
            </div>
        </>
    );
}

export default Preferences;
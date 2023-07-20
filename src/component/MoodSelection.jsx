import { BackendAPI } from "../api/BackendAPIHandler";
import { useState, useEffect } from "react";

function MoodSelection() {
  const [showMoodSelection, setShowMoodSelection] = useState(false);

  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    const checkExistingMood = async () => {
      try {
        const currentDay = new Date().setHours(0, 0, 0, 0);
        const mood = await backendAPIInstance.getMoodForDay(currentDay);
        console.log("Existing Mood:", mood);
        if (mood.moods.length === 0) {
          setShowMoodSelection(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkExistingMood();
  }, []);

  const handleMoodSelection = async (type) => {
    const currentDay = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveMood(type, currentDay);
      setShowMoodSelection(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      {showMoodSelection && (
        <div id="mood-selection">
          <h2>Select your mood</h2>
          <div className="mood-container">
            <button onClick={() => handleMoodSelection("happy")}>
              <h4>😊</h4>
              <p>happy</p>
            </button>
            <button onClick={() => handleMoodSelection("sad")}>
              <h4>😔</h4>
              <p>sad</p>
            </button>
            <button onClick={() => handleMoodSelection("angry")}>
              <h4>😡</h4>
              <p>angry</p>
            </button>
            <button onClick={() => handleMoodSelection("in love")}>
              <h4>😍</h4>
              <p>in love</p>
            </button>
            <button onClick={() => handleMoodSelection("sleepy")}>
              <h4>😴</h4>
              <p>sleepy</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodSelection;

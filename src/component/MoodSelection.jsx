import { BackendAPI } from "../api/BackendAPIHandler";
import { useState } from "react";

function MoodSelection() {
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showMoodCard, setShowMoodCard] = useState(true);
  const [showMoodSelection, setShowMoodSelection] = useState(true);

  const backendAPIInstance = new BackendAPI();

  const handleMoodSelection = async (type) => {
    setIsLoading(true);
    //is the timestamp
    const currentDay = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveMood(type, currentDay);
      setShowMoodSelection(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

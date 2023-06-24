import { BackendAPI } from "../api/BackendAPIHandler";
import { useState } from "react";

function MoodSelection() {
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showMoodCard, setShowMoodCard] = useState(true);

  const backendAPIInstance = new BackendAPI();

  const handleMoodSelection = async (type) => {
    setIsLoading(true);
    //is the timestamp
    const currentDay = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveMood(type, currentDay);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div id="mood-selection">
        <h2>Select your mood</h2>
        <div className="mood-container">
          <button onClick={() => handleMoodSelection("happy")}>
            😊
            <p>happy</p>
          </button>
          <button onClick={() => handleMoodSelection("sad")}>
            😔
            <p>sad</p>
          </button>
          <button onClick={() => handleMoodSelection("angry")}>
            😡
            <p>angry</p>
          </button>
          <button onClick={() => handleMoodSelection("in love")}>
            😍
            <p>in love</p>
          </button>
          <button onClick={() => handleMoodSelection("sleepy")}>
            😴
            <p>sleepy</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoodSelection;

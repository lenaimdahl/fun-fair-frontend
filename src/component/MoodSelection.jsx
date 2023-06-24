import { BackendAPI } from "../api/BackendAPIHandler";
import { useState } from "react";

function MoodSelection() {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const backendAPIInstance = new BackendAPI();

  const handleMoodSelection = async (emoji) => {
    setSelectedEmoji(emoji);
    const today = new Date().setHours(0, 0, 0, 0);
    try {
      await backendAPIInstance.saveMood(emoji, today);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div id="mood-selection">
        <h2>Select your mood</h2>
        <div className="mood-container">
          <span onClick={() => handleMoodSelection("😊")}>😊</span>
          <span onClick={() => handleMoodSelection("😔")}>😔</span>
          <span onClick={() => handleMoodSelection("😡")}>😡</span>
          <span onClick={() => handleMoodSelection("😍")}>😍</span>
          <span onClick={() => handleMoodSelection("😴")}>😴</span>
        </div>
      </div>
    </div>
  );
}

export default MoodSelection;

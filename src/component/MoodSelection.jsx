import { BackendAPI } from "../api/BackendAPIHandler";
import { useState, useEffect } from "react";
import moment from "moment";

function MoodSelection() {
  const [showMoodSelection, setShowMoodSelection] = useState(false);

  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    const checkExistingMood = async () => {
      try {
        const currentDay = moment().format("YYYY-MM-DD");
        const { moods } = await backendAPIInstance.getMoodForDay(currentDay);
        if (moods.length === 0) {
          setShowMoodSelection(true);
        }
        console.log("moods", moods);
      } catch (error) {
        console.error(error);
      }
    };
    checkExistingMood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoodSelection = async (type) => {
    const currentDay = moment().format("YYYY-MM-DD");
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

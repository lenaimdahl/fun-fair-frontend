import "../css/calendar.css";
import React, { useContext } from "react";
import { useState } from "react";
import NewText from "../component/NewText";

function DayView() {
  const [showProfile, setShowProfile] = useState(true);
  const [showTextSection, setShowTextSection] = useState(false);

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleCloseTextClick = () => {
    setShowTextSection(false);
  };

  return (
    <div>
      <div></div>
      {!showTextSection && (
        <button className="button" onClick={handleAddTextClick}>
          <p>Add a new Text Entry for today</p>
        </button>
      )}
      {showTextSection && (
        <div>
          <button onClick={handleCloseTextClick}>
            <p>Close</p>
          </button>
          <NewText />
        </div>
      )}
    </div>
  );
}

export default DayView;

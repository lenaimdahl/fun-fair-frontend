import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import AddEvent from "../component/AddEvent";
import Calendar from "../component/Calendar";
import MoodSelection from "../component/MoodSelection";
import WeeklyMood from "../component/WeeklyMood";
import NewText from "../component/NewText";

function Profile() {
  const { logOutUser, user } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(true);
  const [showTextSection, setShowTextSection] = useState(false);

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleCloseTextClick = () => {
    setShowTextSection(false);
  };

  return (
    <div className="profile-page">
      <h2>Welcome {user && user.username}</h2>

      {!showTextSection && (
        <button onClick={handleAddTextClick}>
          <p>Add a new Text Entry</p>
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

      {showProfile && !showTextSection && (
        <div className="calendar-flex">
          <Calendar />
          <div className="right-side-menu">
            <MoodSelection />
            <AddEvent />
            <button id="btn-logout" onClick={logOutUser}>
              Log out
            </button>
          </div>
        </div>
      )}

      <WeeklyMood />
    </div>
  );
}

export default Profile;

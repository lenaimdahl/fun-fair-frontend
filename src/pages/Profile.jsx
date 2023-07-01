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
  const [showTextSection, setShowTextSection] = useState(false);

  return (
    <div className="profile-page">
      <h2>Welcome {user && user.username}</h2>
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
      <WeeklyMood />

      <div>{showTextSection && <NewText />}</div>
    </div>
  );
}

export default Profile;

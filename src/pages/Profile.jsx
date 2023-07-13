import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import AddEvent from "../component/AddEvent";
import Calendar from "../component/Calendar";
import MoodSelection from "../component/MoodSelection";
import WeeklyMood from "../component/WeeklyMood";
import NewEvent from "../component/NewEvent";
import AddFriend from "../component/AddFriend";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h2>Welcome {user && user.username}</h2>
      <AddFriend />
      <div className="calendar-flex">
        <Calendar />
        <div className="right-side-menu">
          <MoodSelection />
          <div className="event-side-pannel">
            <AddEvent />
            <NewEvent />
          </div>
        </div>
      </div>
      <div>
        <Link to={"/day-view"}>
          <button className="button">
            Add a text for today & see todays activities
          </button>
        </Link>
      </div>
      <WeeklyMood />
    </div>
  );
}

export default Profile;

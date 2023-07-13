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
      <div className="welcome-box">
        <h2>Welcome {user && user.username}</h2>
      </div>
      <div className="calendar-flex">
        <Calendar />
        <div className="right-side-menu">
          <MoodSelection />
          <div className="event-side-pannel">
            <AddEvent />
            <NewEvent />
          </div>
          <div className="text-friend-box">
            <div className="add-text-box">
              <h3>
                Add a text for today <br></br>& see todays activities
              </h3>
              <Link to={"/day-view"}>
                <button>➡️</button>
              </Link>
            </div>
            <AddFriend />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

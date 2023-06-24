import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import AddEvent from "../component/AddEvent";

import Calendar from "../component/Calendar";
import MoodSelection from "../component/MoodSelection";

function Profile() {
  const { logOutUser, user } = useContext(AuthContext);

  return (
    <div>
      {/* {user && user.email} */}
      <div className="calendar-flex">
        <Calendar />
        <div className="right-side-menu">
          <MoodSelection />
          <AddEvent />
        </div>
      </div>

      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}

export default Profile;
